import { Nav } from "@/components/nav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex min-h-screen flex-col md:flex-row">
      <Nav />
      <main className="flex-1 px-6 py-4 md:px-10 md:py-10">{children}</main>
    </section>
  );
}
