import { NavItem } from "@/type/type";
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
