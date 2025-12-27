//@/app/public/layout.tsx
/*
  Layout principal de l'espace public.
  Propose une navigation vers :
  - Recettes de cuisine (@/app/public/recettes/page.tsx)
  - Guide d'élevage pour poules pondeuses (@/app/public/guide-elevage/page.tsx)
*/
import type { ReactNode } from "react";
import PublicNav from "@/app/public/PublicNav";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, Mail, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/20">
      {/* Lien d'évitement pour l'accessibilité */}
      <a
        href="#public-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:ring-2 focus:ring-ring"
      >
        Aller au contenu principal
      </a>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link
                href="/public"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Home className="h-4 w-4 text-primary" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Espace Public
                </span>
              </Link>
            </div>

            {/* Sous-titre pour desktop */}
            <div className="hidden md:flex items-center">
              <p className="text-sm text-muted-foreground">
                Découvrez nos ressources gratuites
              </p>
            </div>
          </div>
        </div>

        <PublicNav />
      </header>

      <main
        id="public-main"
        className="flex-1 container mx-auto px-4 py-6 md:py-8 max-w-6xl"
      >
        {children}
      </main>
    </div>
  );
}
