//@/app/admin/reports/page.tsx
/* Rôle: Page module "Rapports & analyses" (KPIs transverses, exports, comparatifs, tendances). */
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

type ReportsRole = "gestionnaire" | "opérateur" | "visiteur";

type ReportsTool = {
  id:
    | "reports-kpis"
    | "reports-dashboards"
    | "reports-comparatives"
    | "reports-exports"
    | "reports-scheduled"
    | "reports-seasonality"
    | "reports-audit-pack"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: ReportsRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: ReportsRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: ReportsRole): string {
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

function ReportsToolCard({ tool }: { tool: ReportsTool }): JSX.Element {
  return (
    <Link
      href={tool.href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`Ouvrir : ${tool.title}`}
    >
      <Card className="h-full border-2 transition-all duration-300 hover:scale-[1.01] hover:border-primary/40 hover:shadow-lg">
        <CardHeader className="space-y-3 pb-3">
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

export default function ReportsPage(): JSX.Element {
  const tools = [
    {
      id: "reports-kpis",
      title: "KPIs transverses",
      summary:
        "Production, qualité, santé, ambiance, stock, finance : vues unifiées.",
      href: "/admin/reports/kpis",
      role: "visiteur",
      details: [
        "Consolider KPIs clés sur une période (jour/semaine/mois).",
        "Filtrer par bâtiment, lot, zone, et périmètre opérationnel.",
        "Afficher la donnée source (drill-down) pour expliquer un chiffre.",
        "Mettre en avant les alertes (sanitaire, ambiance, qualité) liées aux variations.",
        "Garder un affichage stable (mêmes indicateurs, mêmes unités).",
      ],
      deliverables: ["Dash KPIs", "Filtres", "Drill-down"],
    },
    {
      id: "reports-dashboards",
      title: "Tableaux de bord personnalisés",
      summary: "Composer des dashboards selon rôle et besoins.",
      href: "/admin/reports/dashboards",
      role: "gestionnaire",
      details: [
        "Créer des dashboards par équipe (production, qualité, direction).",
        "Choisir des widgets (courbes, tableaux, compteurs, alertes).",
        "Sauvegarder des filtres (période, site, lot) comme “vues”.",
        "Partager en lecture seule si nécessaire (rôle visiteur).",
        "Versionner (option) pour éviter des changements incontrôlés.",
      ],
      deliverables: ["Dashboards", "Vues sauvegardées", "Partage"],
    },
    {
      id: "reports-comparatives",
      title: "Analyses comparatives",
      summary: "Comparer lots/bâtiments/périodes pour trouver des leviers.",
      href: "/admin/reports/comparatives",
      role: "gestionnaire",
      details: [
        "Comparer lots entre eux (même souche, âges proches).",
        "Comparer bâtiments (ambiance, pannes, consommation) et impact production.",
        "Comparer périodes (avant/après intervention, canicule, changement aliment).",
        "Documenter hypothèses et conclusions (notes d’analyse).",
        "Préparer une synthèse actionnable (actions proposées).",
      ],
      deliverables: ["Comparatifs", "Notes", "Synthèses"],
    },
    {
      id: "reports-exports",
      title: "Exports de données",
      summary: "CSV/Excel (ou API) avec traçabilité des exports.",
      href: "/admin/reports/exports",
      role: "opérateur",
      details: [
        "Exporter par module (production, qualité, stock, finance) et période.",
        "Inclure le contexte (filtres utilisés, date d’export, auteur).",
        "Limiter l’accès selon rôles (ex. finance export restreint).",
        "Conserver un historique d’exports (audit interne).",
        "Proposer des “exports standard” pour gagner du temps.",
      ],
      deliverables: ["Exports", "Templates", "Historique exports"],
    },
    {
      id: "reports-scheduled",
      title: "Rapports programmés",
      summary: "Planifier l’envoi/édition périodique (quotidien, hebdo).",
      href: "/admin/reports/scheduled",
      role: "gestionnaire",
      details: [
        "Planifier des rapports (période, périmètre, destinataires).",
        "Définir format (PDF/CSV selon implémentation) et contenu.",
        "Tracer les exécutions (succès/échec) et relancer si besoin.",
        "Éviter la surcharge : uniquement les rapports utiles.",
        "Garder une preuve d’envoi (audit).",
      ],
      deliverables: ["Planifications", "Historique exécution", "Journaux"],
    },
    {
      id: "reports-seasonality",
      title: "Tendances & saisonnalité",
      summary: "Mettre en évidence tendances et périodes atypiques.",
      href: "/admin/reports/seasonality",
      role: "visiteur",
      details: [
        "Identifier tendances longues (décroissance progressive, dérive qualité).",
        "Mettre en évidence saisonnalité (si visible) et événements récurrents.",
        "Détecter anomalies récurrentes (ex. incidents ambiance en été).",
        "Aider à planifier (renouvellement lots, maintenance, stock).",
        "Exporter une synthèse pour direction.",
      ],
      deliverables: ["Tendances", "Anomalies", "Synthèses"],
    },
    {
      id: "reports-audit-pack",
      title: "Dossier audit (pack)",
      summary: "Regrouper preuves et exports pour inspection / audit interne.",
      href: "/admin/reports/audit-pack",
      role: "gestionnaire",
      details: [
        "Sélectionner une période et un périmètre (site/bâtiment).",
        "Assembler registres, analyses, non-conformités, actions correctives.",
        "Vérifier la complétude (pièces manquantes) avec checklist.",
        "Générer un pack exportable (PDF/ZIP selon implémentation).",
        "Conserver une trace de génération (qui/quand/pourquoi).",
      ],
      deliverables: ["Checklist", "Pack audit", "Historique génération"],
    },
  ] as const satisfies readonly ReportsTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Rapports & analyses
            </h1>
            <p className="text-muted-foreground">
              Centralisez les KPIs, comparatifs et exports pour piloter
              l’exploitation.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Rapports”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module rapports">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ReportsToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Les rapports doivent être “dérivés” (lecture seule) : aucune
              donnée source ne devrait être modifiée depuis ce module, pour
              éviter les incohérences.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les pages cibles (`/kpis`, `/exports`, `/audit-pack`…) pourront
            ensuite s’appuyer sur Prisma et des requêtes agrégées côté serveur.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : chaque chiffre doit permettre d’accéder à sa liste source
        (drill-down) pour être compris et validé.
      </footer>
    </div>
  );
}
