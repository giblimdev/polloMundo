//@/app/admin/daily-production/page.tsx
/* Rôle: Page module "Production quotidienne" (grille d'outils + cartes réutilisables intégrées). */
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

type ProdRole = "gestionnaire" | "opérateur" | "visiteur";

type ProdTool = {
  id:
    | "prod-entry"
    | "prod-trends"
    | "prod-reports"
    | "prod-performance"
    | "prod-projections"
    | "prod-batch-evaluation"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: ProdRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: ProdRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: ProdRole): string {
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

function ProdToolCard({ tool }: { tool: ProdTool }): JSX.Element {
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

export default function DailyProductionPage(): JSX.Element {
  const tools = [
    {
      id: "prod-entry",
      title: "Enregistrement journalier",
      summary:
        "Saisie de la production quotidienne par lot/bâtiment avec contrôles.",
      href: "/admin/daily-production/entry",
      role: "opérateur",
      details: [
        "Saisir production du jour (quantité, calibres si pertinent) par lot et/ou bâtiment.",
        "Ajouter événements (casse, incident, remarque) et pièces jointes (photo/scan).",
        "Valider la saisie (statut brouillon → validé) avec responsable et horodatage.",
        "Détecter incohérences de base (quantité négative, lot absent, doublon de date).",
        "Préparer l’export vers rapports et traçabilité (si module Qualité activé).",
      ],
      deliverables: ["Journal du jour", "Statuts", "Historique"],
    },
    {
      id: "prod-trends",
      title: "Tendances de production",
      summary: "Courbes, comparaisons et vues filtrées sur une période.",
      href: "/admin/daily-production/trends",
      role: "visiteur",
      details: [
        "Visualiser l’évolution (jour/semaine/mois) avec filtres lot/bâtiment.",
        "Comparer J-1, J-7, moyenne mobile, et repérer les ruptures.",
        "Mettre en avant les jours atypiques (outliers) avec explications liées.",
        "Croiser (option) avec météo/ambiance si tu relies le module Environnement.",
        "Exporter les séries pour analyse externe.",
      ],
      deliverables: ["Graphes", "Comparatifs", "Exports"],
    },
    {
      id: "prod-reports",
      title: "Rapports quotidiens & cumulés",
      summary: "Synthèses prêtes à imprimer/exporter pour suivi opérationnel.",
      href: "/admin/daily-production/reports",
      role: "visiteur",
      details: [
        "Générer un rapport du jour (par lot/bâtiment) et un cumul (semaine/mois).",
        "Afficher KPIs: total, par lot, taux de ponte (si effectif/âge disponible).",
        "Inclure événements, anomalies et actions associées (tickets/alertes).",
        "Exporter PDF/CSV (selon implémentation) et conserver l’historique d’édition.",
        "Uniformiser la structure pour audits internes.",
      ],
      deliverables: ["Rapport jour", "Cumul", "Exports", "Historique"],
    },
    {
      id: "prod-performance",
      title: "Analyses de performance",
      summary: "Écarts vs objectifs, diagnostics et synthèses actionnables.",
      href: "/admin/daily-production/performance",
      role: "gestionnaire",
      details: [
        "Comparer performance aux objectifs (par âge/phase si disponible).",
        "Mesurer écarts (niveau, tendance, variabilité) et les classer par priorité.",
        "Identifier causes probables via signaux croisés (santé, ambiance, maintenance).",
        "Produire une synthèse décisionnelle (hypothèse → action → suivi).",
        "Conserver l’historique d’analyses pour apprendre d’un lot à l’autre.",
      ],
      deliverables: ["Écarts", "Synthèse", "Plan d’action (option)"],
    },
    {
      id: "prod-projections",
      title: "Projections (données historiques)",
      summary:
        "Prévisions opérationnelles pour planifier conditionnement et logistique.",
      href: "/admin/daily-production/projections",
      role: "gestionnaire",
      details: [
        "Estimer la production future à court terme (jours/semaines) à partir de l’historique.",
        "Afficher scénarios (conservateur/central/optimiste) si tu gères des hypothèses.",
        "Mettre en évidence l’incertitude et les événements impactants (incident, météo, etc.).",
        "Relier aux capacités (conditionnement, stockage, transport).",
        "Exporter le plan de charge estimé.",
      ],
      deliverables: ["Prévisions", "Scénarios", "Plan de charge"],
    },
    {
      id: "prod-batch-evaluation",
      title: "Évaluation par lot (âge & taux de ponte)",
      summary:
        "Lecture “métier” en reliant âge du lot, effectif et production.",
      href: "/admin/daily-production/by-batch",
      role: "opérateur",
      details: [
        "Afficher le taux de ponte estimé par lot (production / effectif) si l’effectif est suivi.",
        "Comparer à des plages attendues par âge/phase pour repérer les anomalies tôt.",
        "Lister les lots “à surveiller” avec justification (baisse prolongée, variabilité).",
        "Proposer des actions rapides: vérifier ambiance, santé, alimentation, équipements.",
        "Garder un historique des évaluations pour audit et amélioration continue.",
      ],
      deliverables: ["Taux par lot", "Liste surveillance", "Historique"],
    },
  ] as const satisfies readonly ProdTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion de la Production Quotidienne
            </h1>
            <p className="text-muted-foreground">
              Saisissez, analysez et anticipez la production avec des vues
              adaptées aux rôles.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Production”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module production quotidienne">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ProdToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Pour éviter la redondance avec “Rapports & analyses”, garde ici
              les vues directement liées à la saisie et au pilotage
              opérationnel, et déporte le reporting transverse (multi-modules)
              dans le module Rapports.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les pages cibles (`/entry`, `/trends`, `/reports`…) pourront ensuite
            utiliser Prisma pour stocker les enregistrements et produire des
            agrégations côté serveur.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : impose une saisie “1 jour = 1 enregistrement par lot” et un
        statut de validation pour fiabiliser les données.
      </footer>
    </div>
  );
}
