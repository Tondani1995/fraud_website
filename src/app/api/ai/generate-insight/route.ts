const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/auto";

function buildSystemPrompt() {
    return [
        "You write insight articles for Mk Fraud Website, a fraud risk and strategy consultancy.",
        "Your writing style is clear, professional, practical, and authoritative.",
        "The audience includes business leaders, fraud teams, risk professionals, compliance teams, and informed readers.",
        "Write in a structured editorial style similar to a fraud advisory article, not like marketing copy.",
        "Keep the article body between 1200 and 1800 words unless the user asks otherwise.",
        "Return only the article body content, not the title, not metadata, and not any explanations.",
        "Use formatting that is compatible with this editor:",
        "- Use ## for main section headings",
        "- Use ### for smaller subheadings only when needed",
        "- Use - for bullet points where useful",
        "- Use 1. for numbered steps if helpful",
        "- Use **bold** sparingly for emphasis",
        "- You may use *italic* sparingly",
        "- You may use ==highlight== only when it adds value",
        "- You may use <u>underlined text</u> sparingly",
        "- Add links only when truly useful, and keep them relevant and safe",
        "Do not overuse formatting or turn the article into a list-heavy layout.",
        "Start with a strong opening paragraph, then develop the topic with clear sections, practical explanation, and a concise closing section.",
        "Aim for the depth and structure of a serious insight article, not a short blog post.",
        "Use several substantial sections with meaningful headings and developed paragraphs.",
        "Where natural, align the content with fraud risk, fraud prevention, fraud intelligence, controls, awareness, operational resilience, and the South African business context.",
        "Do not use emojis, do not use placeholders, and do not mention AI.",
    ].join(" ");
}

function buildUserPrompt(title: string, excerpt?: string) {
    const trimmedTitle = title.trim();
    const trimmedExcerpt = excerpt?.trim();

    return [
        `Write an insight article for this title: "${trimmedTitle}".`,
        trimmedExcerpt ? `Use this short direction if helpful: "${trimmedExcerpt}".` : "",
        "Make it publication-ready for the Mk Fraud Website insights section.",
        "The article should feel thoughtful, credible, and easy to read.",
        "Include meaningful headings and at least one useful bullet list if the topic benefits from it.",
        "The output should feel similar in length and depth to a full-length fraud insight article.",
        "The output must be clean editor content only.",
    ]
        .filter(Boolean)
        .join(" ");
}

export async function POST(request: Request) {
    try {
        const { title, excerpt } = (await request.json()) as {
            title?: string;
            excerpt?: string;
        };

        if (!title?.trim()) {
            return Response.json(
                { error: "A title is required before generating insight content." },
                { status: 400 }
            );
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return Response.json(
                { error: "Missing OPENROUTER_API_KEY in the environment." },
                { status: 500 }
            );
        }

        const response = await fetch(OPENROUTER_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL
                    ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
                    : "http://localhost:3000",
                "X-Title": "Mk Fraud Website",
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                temperature: 0.7,
                max_completion_tokens: 2400,
                messages: [
                    {
                        role: "system",
                        content: buildSystemPrompt(),
                    },
                    {
                        role: "user",
                        content: buildUserPrompt(title, excerpt),
                    },
                ],
            }),
        });

        const payload = (await response.json()) as {
            error?: { message?: string } | string;
            choices?: Array<{
                message?: {
                    content?: string;
                };
            }>;
        };

        if (!response.ok) {
            const errorMessage =
                typeof payload.error === "string"
                    ? payload.error
                    : payload.error?.message || "OpenRouter request failed.";

            return Response.json({ error: errorMessage }, { status: response.status });
        }

        const content = payload.choices?.[0]?.message?.content?.trim();

        return Response.json({
            content: content || "No content was generated.",
        });
    } catch {
        return Response.json(
            { error: "Something went wrong while generating the insight." },
            { status: 500 }
        );
    }
}
