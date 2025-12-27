//@/app/public/PublicNav.tsx
/**
 * Barre de navigation principale de l'espace public.
 * Contient les liens vers les différentes sections publiques.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JSX } from "react";
import { Home, BookOpen, ChefHat } from "lucide-react";

type PublicNavItem = {
  href: string;
  label: string;
  description: string;
  icon: JSX.Element;
};

const NAV_ITEMS: readonly PublicNavItem[] = [
  {
    href: "/public",
    label: "Accueil",
    description: "Page d'accueil de l'espace public",
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: "/public/recettes",
    label: "Recettes de Cuisine",
    description: "Idées et fiches pratiques de recettes",
    icon: <ChefHat className="h-4 w-4" />,
  },
  {
    href: "/public/guidElevage",
    label: "Guide d'Élevage",
    description: "Poules pondeuses : bases et routines d'élevage",
    icon: <BookOpen className="h-4 w-4" />,
  },
] as const;

function isActivePath(currentPath: string, href: string): boolean {
  if (href === "/public") {
    return currentPath === href || currentPath === "/public/";
  }
  return currentPath.startsWith(`${href}/`) || currentPath === href;
}

export default function PublicNav(): JSX.Element {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label="Navigation principale de l'espace public"
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/public" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">P</span>
              </div>
              <span className="font-semibold text-lg">Public</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Button
                    asChild
                    variant={active ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "h-9 px-3 rounded-md transition-all duration-200",
                      active && "shadow-sm"
                    )}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center gap-2"
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Description pour les écrans larges */}
        <div className="hidden md:block pb-3">
          <p className="text-xs text-muted-foreground px-1">
            Accès direct aux ressources publiques : recettes de cuisine et guide
            d'élevage de poules pondeuses.
          </p>
        </div>
      </div>

      {/* Mobile navigation (simplifié) */}
      <div className="md:hidden border-t">
        <div className="px-2 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
