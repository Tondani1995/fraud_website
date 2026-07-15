import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cape Town Travel Intelligence | Preview",
  description:
    "Analyst-led destination intelligence for international travellers visiting Cape Town.",
  robots: {
    index: false,
    follow: false,
  },
};

const products = [
  {
    name: "Personal Travel Intelligence Brief",
    tag: "Flagship pilot offer",
    description:
      "A tailored pre-arrival brief that turns travel dates, accommodation, movement plans, interests and concerns into clear destination guidance.",
    includes: [
      "Accommodation-area context",
      "Arrival and movement considerations",
      "Timing, route and activity guidance",
      "Common traveller mistakes and practical mitigations",
    ],
  },
  {
    name: "Accommodation & Movement Review",
    tag: "Focused second opinion",
    description:
      "For travellers who have already planned the trip but want an independent review of where they are staying and how they intend to move around.",
    includes: [
      "Hotel or private-rental location review",
      "Airport transfer and self-drive considerations",
      "Day-trip and route practicality",
      "Planning gaps and questions to ask providers",
    ],
  },
  {
    name: "In-Trip Intelligence Support",
    tag: "Premium add-on",
    description:
      "Defined-hours support that helps travellers interpret changing conditions, source-check information and adapt plans without panic.",
    includes: [
      "Situation-aware itinerary adjustments",
      "Local disruption context",
      "Alternative options when plans change",
      "Direction to official assistance where required",
    ],
  },
] as const;

const method = [
  "Traveller profile",
  "Information collection",
  "Source evaluation",
  "Local context",
  "Practical brief",
] as const;

const proofPoints = [
  "Not a generic travel blog",
  "Not an AI-generated itinerary dump",
  "Not a promise of protection or emergency response",
  "A practical decision-support service for visitors who want clarity before they arrive",
] as const;

export default function CttiPreviewPage() {
  return (
    <main className="min-h-screen bg-[#f7f2e8] text-[#14213d]">
      <section className="relative overflow-hidden bg-[#102235] text-white">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute left-[-10%] top-[-20%] h-80 w-80 rounded-full bg-[#d8a24a] blur-3xl" />
          <div className="absolute bottom-[-25%] right-[-10%] h-96 w-96 rounded-full bg-[#58a6a6] blur-3xl" />
        </div>

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d8c59d]">
              CTTI Preview
            </p>
            <p className="mt-1 text-lg font-semibold">Cape Town Travel Intelligence</p>
          </div>
          <a
            href="#pilot"
            className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-[#102235]"
          >
            View pilot offer
          </a>
        </header>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pb-32 lg:pt-20">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[#f1e7d0] backdrop-blur">
              Analyst-led destination intelligence for international visitors
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Explore Cape Town with more clarity before you arrive.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#dfe7ed]">
              CTTI helps travellers make better accommodation, movement and itinerary decisions by turning local context, open-source information and traveller-specific concerns into a practical intelligence brief.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#brief"
                className="rounded-full bg-[#d8a24a] px-7 py-3 text-center text-sm font-semibold text-[#102235] shadow-lg shadow-black/20 transition hover:bg-[#edbd65]"
              >
                See the brief structure
              </a>
              <a
                href="#method"
                className="rounded-full border border-white/25 px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-white hover:text-[#102235]"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-[#f7f2e8] p-6 text-[#102235]">
              <div className="flex items-center justify-between border-b border-[#102235]/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a2f]">
                    Sample traveller profile
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">First-time visitor</h2>
                </div>
                <div className="rounded-full bg-[#102235] px-4 py-2 text-xs font-semibold text-white">
                  7-day stay
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["Arrival", "Late evening arrival at Cape Town International Airport"],
                  ["Accommodation", "Private rental close to main tourism corridors"],
                  ["Movement", "Mix of ride-hailing, guided activities and one self-drive day"],
                  ["Concerns", "Safety, transport, timing and avoiding common tourist mistakes"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6a2f]">
                      {label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#26384d]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#102235] p-5 text-white">
                <p className="text-sm font-semibold text-[#d8c59d]">CTTI output</p>
                <p className="mt-2 text-sm leading-6 text-[#e8edf2]">
                  A concise, practical brief covering accommodation context, arrival choices, movement planning, itinerary fit, common risks, useful alternatives and when to rely on official support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10" id="brief">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">
            The product
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            More than an itinerary. A travel decision brief.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4d5a68]">
            Travellers can find attractions anywhere. What they struggle to find is what the information means for their specific trip, confidence level, location, transport choices and timing. CTTI packages that judgement into a clear pre-arrival deliverable.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="rounded-[1.75rem] border border-[#102235]/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6a2f]">
                {product.tag}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{product.name}</h3>
              <p className="mt-4 text-sm leading-7 text-[#536170]">{product.description}</p>
              <ul className="mt-6 space-y-3">
                {product.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#29394a]">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#d8a24a]" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20" id="method">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">
                The method
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                A simple intelligence cycle, translated for travel.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4d5a68]">
                CTTI is built around structured thinking: understand the traveller, collect current information, evaluate the sources, add local context, and convert it into practical recommendations.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-5">
              {method.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[1.35rem] border border-[#102235]/10 bg-[#f7f2e8] p-5 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#102235] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-5">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] bg-[#102235] p-8 text-white md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d8c59d]">
              Why it is different
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              Built for travellers who want confidence, not content overload.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <p className="text-sm leading-6 text-[#edf2f6]">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#102235]/10 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">
              Preview positioning
            </p>
            <blockquote className="mt-6 text-2xl font-medium leading-10 text-[#102235]">
              “We turn complex and conflicting information about Cape Town into clear, personalised guidance for your trip — before you arrive and while you are here.”
            </blockquote>
            <p className="mt-6 text-sm leading-7 text-[#536170]">
              The tone should feel calm, credible and premium. The service is not fear-based tourism content. It is practical destination intelligence for people who want to travel thoughtfully.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#efe4cf] py-20" id="pilot">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8a6a2f]">
                90-day pilot
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Test demand before building the full platform.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#4d5a68]">
                The first version should validate whether travellers and hospitality partners understand the offer, trust the positioning and are willing to enquire or pay.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Build", "Landing page, intake form, report template and simple enquiry flow."],
                  ["Test", "Share with travellers, expats, villas, boutique hotels and travel planners."],
                  ["Learn", "Track what people value, ask, object to and are willing to pay for."],
                  ["Refine", "Narrow the offer before adding payments, automation or more pages."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-[#f7f2e8] p-5">
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#536170]">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-[#102235] p-5 text-white">
                <p className="font-semibold">Pilot CTA placeholder</p>
                <p className="mt-2 text-sm leading-6 text-[#dfe7ed]">
                  “Request a sample brief” or “Join the Cape Town pilot” can be connected to a form once the product names, pricing and enquiry email are confirmed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#102235] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm leading-6 text-[#cbd6df] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Cape Town Travel Intelligence. Preview concept.</p>
          <p className="max-w-2xl">
            CTTI provides destination information and travel decision support. It does not provide personal protection, emergency response, law-enforcement services or guaranteed safety outcomes.
          </p>
        </div>
      </footer>
    </main>
  );
}
