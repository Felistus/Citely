import {
  Bot,
  FileSearch,
  FileText,
  Gauge,
  LayoutDashboard,
  Search,
} from "lucide-react";

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "/dashboard/citability-scorer",
    label: "Citability Scorer",
    icon: FileSearch,
  },
  { href: "/dashboard/ai-simulator", label: "AI Answer Simulator", icon: Bot },
  { href: "/dashboard/llms-txt", label: "llms.txt Studio", icon: FileText },
  { href: "/dashboard/serp-preview", label: "SERP Preview", icon: Search },
  { href: "/dashboard/web-vitals", label: "Web Vitals", icon: Gauge },
];

export const MODULES: ModuleSummary[] = [
  {
    id: "citability-scorer",
    title: "Citability Scorer",
    description:
      "Paste content or a URL to see how citable it is to AI answer engines.",
    href: "/dashboard/citability-scorer",
    icon: FileSearch,
  },
  {
    id: "ai-simulator",
    title: "AI Answer Simulator",
    description:
      "Preview how your content would appear inside a ChatGPT or Perplexity answer.",
    href: "/dashboard/ai-simulator",
    icon: Bot,
  },
  {
    id: "llms-txt",
    title: "llms.txt Studio",
    description: "Generate, validate, and preview your site's llms.txt file.",
    href: "/dashboard/llms-txt",
    icon: FileText,
  },
  {
    id: "serp-preview",
    title: "SERP Preview",
    description:
      "See how your title and meta description render in Google search results.",
    href: "/dashboard/serp-preview",
    icon: Search,
  },
  {
    id: "web-vitals",
    title: "Web Vitals",
    description:
      "Check your page's Core Web Vitals and see what's holding your score back.",
    href: "/dashboard/web-vitals",
    icon: Gauge,
  },
];
