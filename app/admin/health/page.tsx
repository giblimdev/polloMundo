//@/app/admin/health/page.tsx
/* Rôle: Page module "Santé animale & Biosécurité" (grille d'outils + cartes réutilisables intégrées). */
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

type HealthRole = "gestionnaire" | "opérateur" | "visiteur";

type HealthTool = {
  id:
    | "health-vaccination"
    | "health-treatments"
    | "health-mortality"
    | "health-alerts"
    | "health-biosecurity"
    | "health-water"
    | "health-feed"
    | "health-body-score"
    | "health-parasites"
    | "health-effectiveness"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: HealthRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: HealthRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: HealthRole): string {
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

function HealthToolCard({ tool }: { tool: HealthTool }): JSX.Element {
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

export default function HealthPage(): JSX.Element {
  const tools = [
    {
      id: "health-vaccination",
      title: "Suivi vaccinal par lot",
      summary: "Calendrier, rappels, lots de vaccins et preuves.",
      href: "/admin/health/vaccination",
      role: "gestionnaire",
      details: [
        "Planifier un calendrier vaccinal par lot (dates, protocole, rappels).",
        "Tracer le lot de vaccin, le responsable, le mode d’administration et la dose.",
        "Attacher preuves (ordonnance, fiche produit, documents internes).",
        "Déclencher des alertes avant échéance et en cas de retard.",
        "Afficher l’historique par lot (audit).",
      ],
      deliverables: ["Calendrier", "Historique vaccinal", "Alertes"],
    },
    {
      id: "health-treatments",
      title: "Registre des traitements médicamenteux",
      summary: "Médicaments, posologies, prescriptions et délais d’attente.",
      href: "/admin/health/treatments",
      role: "gestionnaire",
      details: [
        "Saisir traitements (molécule, posologie, durée) et joindre ordonnance.",
        "Gérer délais d’attente et restrictions (vente/consommation).",
        "Relier traitement au lot/bâtiment et aux symptômes observés.",
        "Tracer qui a administré et quand (responsabilité).",
        "Exporter un registre conforme pour audit interne/réglementaire.",
      ],
      deliverables: ["Registre", "Délais d’attente", "Exports"],
    },
    {
      id: "health-mortality",
      title: "Mortalité quotidienne & cumulée",
      summary: "Saisie, consolidation, seuils et interprétation.",
      href: "/admin/health/mortality",
      role: "opérateur",
      details: [
        "Enregistrer mortalité quotidienne par lot/bâtiment, avec cause supposée.",
        "Calculer cumul, taux et évolution (tendance).",
        "Détecter dépassements de seuils et déclencher une investigation.",
        "Relier aux événements (ambiance, panne, traitement, stress).",
        "Produire un rapport simple pour réunion d’exploitation.",
      ],
      deliverables: ["Courbes", "Seuils", "Rapport"],
    },
    {
      id: "health-alerts",
      title: "Alertes sanitaires automatiques",
      summary: "Règles, déclenchements, acquittements et suivi.",
      href: "/admin/health/alerts",
      role: "gestionnaire",
      details: [
        "Définir des règles d’alerte (mortalité, baisse de production, symptômes).",
        "Centraliser les alertes et leur statut (nouvelle, en cours, clôturée).",
        "Assigner une action (contrôle, traitement, appel vétérinaire).",
        "Tracer l’acquittement et les décisions (audit).",
        "Évaluer la qualité du système d’alerte (faux positifs/retards).",
      ],
      deliverables: ["Règles", "File d’alertes", "Historique actions"],
    },
    {
      id: "health-biosecurity",
      title: "Plan de biosécurité",
      summary: "Protocoles, checklists et incidents de biosécurité.",
      href: "/admin/health/biosecurity",
      role: "gestionnaire",
      details: [
        "Formaliser les protocoles (sas, tenues, désinfection, flux).",
        "Publier checklists (quotidien/hebdo) et suivi d’exécution.",
        "Déclarer incidents (intrusion, rupture de protocole) et mesures correctives.",
        "Versionner le plan (preuve d’évolution) et attacher documents.",
        "Préparer un dossier d’audit rapide (preuves + historique).",
      ],
      deliverables: ["Plan biosécurité", "Checklists", "Preuves"],
    },
    {
      id: "health-water",
      title: "Suivi des consommations d’eau",
      summary: "Consommation, dérives et corrélation santé/production.",
      href: "/admin/health/water",
      role: "opérateur",
      details: [
        "Enregistrer consommation d’eau (manuel/capteur) par bâtiment/lot.",
        "Détecter dérives (chute ou pic) et proposer une investigation.",
        "Croiser avec ambiance (température) et production (taux de ponte).",
        "Suivre la qualité de l’eau si tu ajoutes des analyses (option).",
        "Produire des indicateurs utiles au diagnostic.",
      ],
      deliverables: ["KPI eau", "Alertes dérive", "Historique"],
    },
    {
      id: "health-feed",
      title: "Indices de conversion alimentaire (IC)",
      summary:
        "Suivi alimentation et efficience (option si données disponibles).",
      href: "/admin/health/feed",
      role: "gestionnaire",
      details: [
        "Importer/saisir quantités d’aliments consommés par lot/bâtiment.",
        "Calculer IC (selon ta méthode : par œuf, par kg, par période).",
        "Comparer par âge/phase et détecter dérives.",
        "Relier aux événements (maladie, stress, ambiance, maintenance).",
        "Alimenter l’analyse financière (coût de revient).",
      ],
      deliverables: ["KPI IC", "Comparatifs", "Exports"],
    },
    {
      id: "health-body-score",
      title: "État corporel (BCS) & observations",
      summary: "Évaluations terrain, scores et tendances.",
      href: "/admin/health/body-score",
      role: "opérateur",
      details: [
        "Saisir observations terrain (score, notes, photos).",
        "Analyser tendances par lot et corréler avec performance.",
        "Créer des recommandations (alimentation, ambiance, vétérinaire).",
        "Suivre la mise en place d’actions et l’évolution.",
        "Garder la traçabilité pour audit interne.",
      ],
      deliverables: ["Journal observations", "Tendances"],
    },
    {
      id: "health-parasites",
      title: "Parasites & vermifugation",
      summary: "Programme, contrôles et suivi d’efficacité.",
      href: "/admin/health/parasites",
      role: "gestionnaire",
      details: [
        "Planifier la vermifugation et les contrôles parasitaires.",
        "Tracer les traitements et les résultats de contrôles.",
        "Détecter récurrences et ajuster le protocole.",
        "Relier aux lots/bâtiments et aux facteurs environnementaux.",
        "Construire un historique utile pour stratégie sanitaire.",
      ],
      deliverables: ["Programme", "Contrôles", "Historique"],
    },
    {
      id: "health-effectiveness",
      title: "Suivi de l’efficacité des traitements",
      summary: "Avant/après, indicateurs et décisions.",
      href: "/admin/health/effectiveness",
      role: "visiteur",
      details: [
        "Comparer indicateurs avant/après (mortalité, production, symptômes).",
        "Mesurer délais d’amélioration et cas de non-réponse.",
        "Documenter décisions (ajustement protocole, escalade vétérinaire).",
        "Capitaliser sur l’historique pour standardiser les pratiques.",
        "Préparer des synthèses “retour d’expérience”.",
      ],
      deliverables: ["Analyses avant/après", "Synthèses", "Historique"],
    },
  ] as const;

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Santé animale & Biosécurité
            </h1>
            <p className="text-muted-foreground">
              Centralisez le suivi sanitaire, les protocoles et les indicateurs
              pour prévenir les risques.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Santé”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module santé">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <HealthToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Conserve une “timeline santé” par lot (vaccins, traitements,
              mortalité, incidents) : c’est la meilleure vue métier pour
              investiguer vite.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/vaccination`, `/treatments`, `/alerts`…) pourront
            ensuite appliquer des permissions et des validations (ex. double
            validation pour traitements sensibles).
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : une alerte doit toujours proposer une action concrète
        (assigner, commenter, clôturer) et garder un historique.
      </footer>
    </div>
  );
}
