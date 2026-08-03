export default function AiSimulatorPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">
        AI Answer Simulator
      </h1>
      <p className="mt-2 text-muted-foreground">
        Preview how your content would appear inside a ChatGPT or Perplexity
        answer.
      </p>
      <div
        id="chat-container"
        role="figure"
        aria-label="Chat container"
        className="h-[70vh] "
      >
        {/* <ChatContainer scoredContent={DUMMY_SCORED_CONTENT} /> */}
      </div>
    </section>
  );
}
