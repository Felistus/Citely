async function getHealth() {
  const psiKey = process.env.PSI_API_KEY || "";
  const targetUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const googlePageSpeedInsightsUrl = new URL(
    process.env.NEXT_PUBLIC_GOOGLE_PAGE_SPEED_INSIGHTS_URL || "",
  );

  googlePageSpeedInsightsUrl.searchParams.set("url", targetUrl);
  googlePageSpeedInsightsUrl.searchParams.set("category", "performance");
  if (psiKey) {
    googlePageSpeedInsightsUrl.searchParams.set("key", psiKey);
  }

  const url = googlePageSpeedInsightsUrl.toString();
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return {
      ok: false,
      score: null,
      url,
    };
  }

  const data = await res.json();
  const dataScore = data.lighthouseResult?.categories?.performance?.score;
  const score = dataScore ? Math.round(dataScore * 100) : null;

  return {
    ok: true,
    score,
    url,
  };
}

export default async function HealthPage() {
  const { ok, score, url } = await getHealth();
  console.log("OK:>>>", ok);
  console.log("SCORE:>>>", score);
  console.log("URL:>>>", url);
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">System Health</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        PageSpeed Insights API:{" "}
        {ok ? `reachable (sample score: ${score})` : "unreachable"}
      </p>
    </main>
  );
}
