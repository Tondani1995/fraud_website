const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openrouter/auto";

function buildSystemPrompt() {
    return [
        "You generate short website insight tags for Mk Fraud Website, a fraud risk and strategy consultancy.",
        "Your job is to return relevant tags only, based on an insight title, excerpt, and article content.",
        "Return between 6 and 10 tags.",
        "Each tag must be short, specific, and useful for insight categorisation.",
        "Prefer tags related to fraud risk, fraud prevention, cybercrime, controls, awareness, intelligence, compliance, South Africa, operations, and governance when relevant.",
        "Avoid duplicates.",
        "Avoid hashtags.",
        "Avoid numbering or bullet points.",
        "Return only a single comma-separated line of tags and nothing else.",
    ].join(" ");
}

function buildUserPrompt(title: string, excerpt?: string, content?: string) {
    return [
        `Title: ${title.trim()}`,
        excerpt?.trim() ? `Excerpt: ${excerpt.trim()}` : "",
        content?.trim() ? `Content: ${content.trim().slice(0, 5000)}` : "",
        "Generate concise relevant tags for this insight.",
    ]
        .filter(Boolean)
        .join("\n\n");
}

function parseTags(raw: string) {
    return raw
        .split(",")
        .map((tag) => tag.trim())
        .map((tag) => tag.replace(/^[-*#\d.\s]+/, "").trim())
        .filter(Boolean)
        .filter((tag, index, all) => all.findIndex((item) => item.toLowerCase() === tag.toLowerCase()) === index)
        .slice(0, 10);
}

export async function POST(request: Request) {
    try {
        const { title, excerpt, content } = (await request.json()) as {
            title?: string;
            excerpt?: string;
            content?: string;
        };

        if (!title?.trim()) {
            return Response.json(
                { error: "A title is required before generating tags." },
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
                temperature: 0.4,
                max_completion_tokens: 220,
                messages: [
                    {
                        role: "system",
                        content: buildSystemPrompt(),
                    },
                    {
                        role: "user",
                        content: buildUserPrompt(title, excerpt, content),
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

        const rawTags = payload.choices?.[0]?.message?.content?.trim() || "";
        const tags = parseTags(rawTags);

        return Response.json({
            tags,
            tagsText: tags.join(", "),
        });
    } catch {
        return Response.json(
            { error: "Something went wrong while generating tags." },
            { status: 500 }
        );
    }
}
