import { ChatContainer } from "@/components/simulator/ChatContainer";

const DUMMY_SCORED_CONTENT: ScoredContent = {
  url: "https://example.com/what-is-llms-txt",
  rawText: `What is llms.txt? llms.txt is a proposed standard that gives AI
crawlers a clean, structured summary of a website's key pages. It sits at
the root of a domain, similar to robots.txt, and lists the most important
content in plain markdown links. Sites are adopting it as AI answer
engines like ChatGPT and Perplexity become a larger source of traffic.
The format is still young, and adoption is inconsistent across providers.`,
  breakdown: {
    total: 68,
    signals: [
      {
        id: "direct-answer",
        label: "Direct-answer structure",
        score: 100,
        weight: 25,
        explanation:
          "The opening sentence directly answers the heading's question.",
      },
      {
        id: "heading-hierarchy",
        label: "Heading hierarchy",
        score: 60,
        weight: 20,
        explanation: "Only one heading is present, hard to judge nesting.",
      },
      {
        id: "entity-clarity",
        label: "Entity clarity",
        score: 40,
        weight: 20,
        explanation:
          'The second half leans on "it" and "the format" instead of naming llms.txt again.',
      },
      {
        id: "schema-presence",
        label: "Schema markup presence",
        score: 0,
        weight: 15,
        explanation: "No JSON-LD structured data detected on the page.",
      },
      {
        id: "list-table-usage",
        label: "List/table usage",
        score: 50,
        weight: 10,
        explanation: "Dense paragraph, no list used for the adoption note.",
      },
      {
        id: "freshness",
        label: "Freshness signal",
        score: 100,
        weight: 10,
        explanation: "A visible last-updated date is present on the page.",
      },
    ],
  },
};

export default function AiSimulatorPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">
        AI Answer Simulator
      </h1>
      <p className="mt-2 text-muted-foreground text-sm sm:text-base">
        Preview how your content would appear inside a ChatGPT or Perplexity
        answer.
      </p>
      <div
        id="chat-container"
        role="figure"
        aria-label="Chat container"
        className="h-[70vh] mt-5 "
      >
        <ChatContainer scoredContent={DUMMY_SCORED_CONTENT} />
      </div>
    </section>
  );
}
