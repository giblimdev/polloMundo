//@/app/admin/maintenance/page.tsx
/* Rôle: Page module "Maintenance & équipements" (préventif, interventions, pièces, disponibilité, coûts). */
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

type MaintenanceRole = "gestionnaire" | "opérateur" | "visiteur";

type MaintenanceTool = {
  id:
    | "maint-planning"
    | "maint-work-orders"
    | "maint-incidents"
    | "maint-assets"
    | "maint-spares"
    | "maint-contracts"
    | "maint-costs"
    | "maint-availability"
    | "maint-history"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: MaintenanceRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(
  role: MaintenanceRole
): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: MaintenanceRole): string {
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

function MaintenanceToolCard({ tool }: { tool: MaintenanceTool }): JSX.Element {
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

export default function MaintenancePage(): JSX.Element {
  const tools = [
    {
      id: "maint-planning",
      title: "Planning préventif",
      summary: "Gamme, périodicité, checklists et suivi des retards.",
      href: "/admin/maintenance/planning",
      role: "opérateur",
      details: [
        "Créer des plans de maintenance préventive (périodicité, responsables, étapes).",
        "Utiliser des checklists par type d’équipement/bâtiment.",
        "Suivre l’avancement (à faire/en cours/terminé) et les retards.",
        "Tracer l’exécution (qui/quand) pour audit interne.",
        "Éviter les pannes via un planning clair et actionnable.",
      ],
      deliverables: ["Planning", "Checklists", "Taux de réalisation"],
    },
    {
      id: "maint-work-orders",
      title: "Ordres de travail",
      summary: "Créer, assigner et suivre les interventions planifiées.",
      href: "/admin/maintenance/work-orders",
      role: "opérateur",
      details: [
        "Créer un ordre de travail à partir du préventif ou d’une demande.",
        "Assigner à un intervenant (interne/prestataire) et fixer une échéance.",
        "Décrire les étapes, pièces nécessaires, et précautions de sécurité.",
        "Suivre statut et commentaires, puis clôturer avec compte-rendu.",
        "Conserver l’historique pour analyser les récurrences.",
      ],
      deliverables: ["Ordres de travail", "Historique", "Comptes-rendus"],
    },
    {
      id: "maint-incidents",
      title: "Pannes & interventions correctives",
      summary: "Tickets, priorités, diagnostics et résolution.",
      href: "/admin/maintenance/incidents",
      role: "opérateur",
      details: [
        "Déclarer une panne (équipement, bâtiment, description, gravité).",
        "Prioriser (impact production / santé / biosécurité) et assigner.",
        "Tracer diagnostic, actions réalisées, temps passé et pièces utilisées.",
        "Clôturer avec cause racine (option) et prévention proposée.",
        "Relier à une alerte (ambiance/production) si déclencheur automatique.",
      ],
      deliverables: ["Tickets", "Diagnostics", "Actions", "Clôture"],
    },
    {
      id: "maint-assets",
      title: "Parc équipements",
      summary: "Référentiel équipements: état, garanties, localisation.",
      href: "/admin/maintenance/assets",
      role: "gestionnaire",
      details: [
        "Centraliser la fiche équipement (numéro série, modèle, date mise en service).",
        "Localiser (bâtiment/zone) et suivre l’état (OK / à surveiller / HS).",
        "Gérer garanties, prestataires associés et documents techniques.",
        "Consulter historique interventions et coûts par équipement.",
        "Éviter les doublons avec Bâtiments/Stocks via un modèle unique.",
      ],
      deliverables: ["Fiches équipements", "Localisations", "Docs"],
    },
    {
      id: "maint-spares",
      title: "Pièces détachées",
      summary: "Consommation pièces et lien avec le stock.",
      href: "/admin/maintenance/spares",
      role: "opérateur",
      details: [
        "Lister les pièces critiques et leurs stocks mini.",
        "Enregistrer l’utilisation d’une pièce sur une intervention.",
        "Déclencher une demande d’achat si seuil franchi (lien Stocks).",
        "Tracer lots/compatibilités équipement pour éviter les erreurs.",
        "Analyser les pièces les plus consommées (préventif).",
      ],
      deliverables: [
        "Liste pièces",
        "Consommation",
        "Seuils",
        "Demandes achat",
      ],
    },
    {
      id: "maint-contracts",
      title: "Contrats prestataires",
      summary: "SLA, documents, échéances et prestations.",
      href: "/admin/maintenance/contracts",
      role: "gestionnaire",
      details: [
        "Référencer contrats (SLA, périmètre, dates, documents).",
        "Relier au fournisseur (référentiel unique côté Stocks si choisi).",
        "Suivre échéances (renouvellement) et alertes.",
        "Associer un contrat à des équipements/bâtiments couverts.",
        "Faciliter le pilotage prestataire (respect SLA).",
      ],
      deliverables: ["Contrats", "Échéances", "Couverture", "Docs"],
    },
    {
      id: "maint-costs",
      title: "Coûts de maintenance",
      summary: "Coûts par équipement/bâtiment/période, interne vs prestataire.",
      href: "/admin/maintenance/costs",
      role: "gestionnaire",
      details: [
        "Consolider coûts (pièces, main d’œuvre, prestataires).",
        "Ventiler par équipement, bâtiment, type d’intervention.",
        "Suivre dérives (coût croissant) et arbitrer remplacement vs réparation.",
        "Produire une synthèse pour Finance (coût de revient).",
        "Aider à prioriser les investissements.",
      ],
      deliverables: ["KPI coûts", "Synthèses", "Exports (option)"],
    },
    {
      id: "maint-availability",
      title: "Disponibilité & indisponibilités",
      summary: "Impact des pannes sur production et risques.",
      href: "/admin/maintenance/availability",
      role: "opérateur",
      details: [
        "Déclarer indisponibilité d’un équipement (début/fin estimée).",
        "Qualifier impact (production, ambiance, biosécurité).",
        "Suivre la résolution et l’historique des indisponibilités.",
        "Afficher une vue “risques du jour” (équipements critiques HS).",
        "Aider à coordonner avec Production/Environnement.",
      ],
      deliverables: ["État dispo", "Risques", "Historique"],
    },
    {
      id: "maint-history",
      title: "Historique & analyses maintenance",
      summary: "Récurrences, temps de résolution et amélioration continue.",
      href: "/admin/maintenance/history",
      role: "visiteur",
      details: [
        "Analyser récurrences par équipement/bâtiment.",
        "Suivre temps de résolution (MTTR) et fréquence (MTBF) si tu les ajoutes.",
        "Identifier causes dominantes et actions préventives à mettre en place.",
        "Documenter décisions (remplacement, upgrade, changement prestataire).",
        "Exporter les données pour reporting transverse.",
      ],
      deliverables: ["Analyses", "Exports", "Décisions"],
    },
  ] as const satisfies readonly MaintenanceTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Maintenance & équipements
            </h1>
            <p className="text-muted-foreground">
              Planifiez le préventif, gérez les pannes, suivez les pièces et
              pilotez les coûts.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Maintenance”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module maintenance">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <MaintenanceToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Un ticket doit toujours se terminer par un compte-rendu (cause +
              action) : sinon l’historique ne sert pas à prévenir la prochaine
              panne.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/incidents`, `/work-orders`, `/assets`…) pourront
            ensuite intégrer des workflows (statuts, assignation) et des Server
            Actions.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : mets en évidence “pannes ouvertes” et “préventif en retard”
        sur la page d’accueil du module.
      </footer>
    </div>
  );
}
