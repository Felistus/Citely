async function getHealth() {
  const res = await fetch("https://api.github.com/zen", { cache: "no-store" });
  return res.text();
}

export default async function HealthPage() {
  const status = await getHealth();
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">System Health</h1>
      <p className="mt-2 text-sm text-muted-foreground">{status}</p>
    </main>
  );
}
