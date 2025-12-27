//@/app/admin/buildings/page.tsx
/* Rôle: Page module "Gestion des bâtiments" (liste d'outils + cartes réutilisables intégrées). */
import Link from "next/link";
import type { JSX, ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type BuildingRole = "gestionnaire" | "opérateur" | "visiteur";

type BuildingTool = {
  id: "buildings-crud" | "equipments" | "building-maintenance" | (string & {});
  title: string;
  summary: string;
  href: string;
  role: BuildingRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: BuildingRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: BuildingRole): string {
  switch (role) {
    case "gestionnaire":
      return "Gestionnaire";
    case "opérateur":
      return "Opérateur";
    case "visiteur":
      return "Visiteur";
  }
}

function Dot(): ReactNode {
  return (
    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
  );
}

function BuildingToolCard({ tool }: { tool: BuildingTool }): JSX.Element {
  return (
    <Link
      href={tool.href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Ouvrir : ${tool.title}`}
    >
      <Card className="h-full border-2 transition-all duration-300 hover:scale-[1.01] hover:border-primary/40 hover:shadow-lg">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-lg transition-colors group-hover:text-primary">
                {tool.title}
              </CardTitle>
              <CardDescription>{tool.summary}</CardDescription>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <Badge variant={roleVariant(tool.role)} className="font-medium">
                {roleLabel(tool.role)}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {tool.details.length} points
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {tool.details.slice(0, 5).map((d) => (
              <li key={d} className="flex gap-2">
                {Dot()}
                <span className="leading-snug">{d}</span>
              </li>
            ))}
          </ul>

          {tool.deliverables?.length ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tool.deliverables.map((x) => (
                <span
                  key={x}
                  className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {x}
                </span>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function BuildingsPage(): JSX.Element {
  const tools = [
    {
      id: "buildings-crud",
      title: "Bâtiments (CRUD)",
      summary: "Gérer les bâtiments, zones, capacités et documents.",
      href: "/admin/buildings/manage",
      role: "gestionnaire",
      details: [
        "Créer / modifier un bâtiment (nom, type, localisation, zone d’activité).",
        "Définir capacité (ponte, stockage) + contraintes (bio, accès, sécurité).",
        "Gérer les zones internes (salle ponte, sas, stockage, quai).",
        "Attacher documents (plans PDF, photos, contrôles, certificats).",
        "Historiser les modifications (audit interne).",
      ],
      deliverables: ["Fiche bâtiment", "Plan/Docs", "Zones", "Audit log"],
    },
    {
      id: "equipments",
      title: "Équipements implantés",
      summary: "Suivi des équipements par bâtiment et par zone.",
      href: "/admin/buildings/equipments",
      role: "opérateur",
      details: [
        "Inventorier les équipements installés (ventilation, éclairage, abreuvement).",
        "Rattacher un équipement à une zone précise (implantation).",
        "Suivre état, numéro de série, garantie, date de mise en service.",
        "Consulter l’historique des interventions (liens vers Maintenance).",
        "Gérer la criticité (impact si panne) pour prioriser les actions.",
      ],
      deliverables: [
        "Inventaire",
        "Fiche équipement",
        "Historique",
        "Criticité",
      ],
    },
    {
      id: "building-maintenance",
      title: "Entretien des bâtiments",
      summary: "Préventif/correctif, checklists et suivi des interventions.",
      href: "/admin/buildings/maintenance",
      role: "opérateur",
      details: [
        "Planifier l’entretien préventif (nettoyage, contrôles périodiques).",
        "Créer des demandes d’intervention (tickets) avec statut et priorité.",
        "Consigner actions réalisées, temps passé, pièces et prestataires.",
        "Suivre les coûts par bâtiment et détecter les dérives.",
        "Sortir une synthèse (travaux à faire, retards, interventions clôturées).",
      ],
      deliverables: ["Planning", "Tickets", "Historique", "Coûts"],
    },
  ] as const satisfies readonly BuildingTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion des Bâtiments
            </h1>
            <p className="text-muted-foreground">
              Pilotez infrastructures, zones, équipements et entretiens depuis
              un point central.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Bâtiments”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module bâtiments">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <BuildingToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Gardez un référentiel unique “Équipement” et reliez-le aux
              bâtiments (implantation) et à la maintenance (interventions) pour
              éviter les doublons fonctionnels.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Chaque outil ci-dessus doit pointer vers un sous-module dédié (pages
            séparées) avec ses propres listes, formulaires et permissions.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : privilégiez des pages “liste + fiche détail” et des filtres
        (bâtiment, zone, statut, période).
      </footer>
    </div>
  );
}
