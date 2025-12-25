import { Layers3 } from "lucide-react";
import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Layers3 className="h-7 w-7 text-primary" />
      <span
        className={`font-headline text-2xl font-bold ${light ? "text-sidebar-foreground" : "text-foreground"}`}
      >
        TenantVerse
      </span>
    </Link>
  );
}
