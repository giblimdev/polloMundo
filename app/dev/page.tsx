// @/app/dev/page.tsx
/* page d'aide au developpement presentant les feature, les pages à créer, le schema prisma */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Target,
  FolderTree,
  Database,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";
import Architecture from "./Architecture";
import Schema from "./Schema2";
import Scrum from "./Scrum";

type View = "home" | "scrum" | "architecture" | "schema";

export default function Page() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: "scrum" as View,
      label: "Scrum / Backlog",
      icon: <Target size={20} />,
      description: "Gestion des fonctionnalités et suivi du sprint",
    },
    {
      id: "architecture" as View,
      label: "Architecture",
      icon: <FolderTree size={20} />,
      description: "Structure des pages et routes de l'application",
    },
    {
      id: "schema" as View,
      label: "Schéma BDD",
      icon: <Database size={20} />,
      description: "Modèle de données Prisma et relations",
    },
  ];

  const renderContent = () => {
    switch (currentView) {
      case "scrum":
        return <Scrum />;
      case "architecture":
        return <Architecture />;
      case "schema":
        return <Schema />;
      case "home":
      default:
        return <HomePage navItems={navItems} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation principale */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  onClick={() => setCurrentView(item.id)}
                  className="flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Menu hamburger Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start gap-2"
                  >
                    {item.icon}
                    <div className="text-left">
                      <div>{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Fil d'Ariane */}
      {currentView !== "home" && (
        <div className="border-b bg-muted/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => setCurrentView("home")}
                className="hover:text-foreground transition-colors"
              >
                Accueil
              </button>
              <ChevronRight size={16} />
              <span className="text-foreground font-medium">
                {navItems.find((item) => item.id === currentView)?.label}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
}

// Page d'accueil avec les cartes
function HomePage({
  navItems,
  setCurrentView,
}: {
  navItems: {
    id: View;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[];
  setCurrentView: (view: View) => void;
}) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Outils de Développement
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Documentation complète et outils pour le développement de
          l&apos;application PolloMondo
        </p>
        <section>
          <h2></h2>
          <p>
            les constantes serons issus des donnee de la db (prix reel) ou de
            admin/ParamData sinon disponible
          </p>
          <p>admin</p>
          <p>hr resources humaine task</p>
          <p>public refroupe des donnee generale sur l'élevage</p>
          <p>
            user defini L'utilisateur de terrain recolte d'information et
            realisateur des taches métier
          </p>
        </section>
      </div>

      {/* Cartes de navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {navItems.map((item) => (
          <Card
            key={item.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
            onClick={() => setCurrentView(item.id)}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{item.icon}</div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Accéder
                <ChevronRight
                  size={16}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Section informations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Target className="text-primary" />À propos du projet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            PolloMondo est une application de gestion d&apos;élevage de poules
            pondeuses. Cette section regroupe tous les outils nécessaires au
            développement.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Next.js 15 + TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Prisma + PostgreSQL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>shadcn/ui + Tailwind CSS</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <FolderTree className="text-primary" />
            Raccourcis utiles
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => setCurrentView("scrum")}
              className="w-full p-3 border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium">Backlog produit</div>
              <div className="text-xs text-muted-foreground">
                Voir les fonctionnalités à développer
              </div>
            </button>
            <button
              onClick={() => setCurrentView("architecture")}
              className="w-full p-3 border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium">Routes de l&apos;app</div>
              <div className="text-xs text-muted-foreground">
                Explorer la structure des pages
              </div>
            </button>
            <button
              onClick={() => setCurrentView("schema")}
              className="w-full p-3 border rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium">Base de données</div>
              <div className="text-xs text-muted-foreground">
                Consulter le schéma Prisma
              </div>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
