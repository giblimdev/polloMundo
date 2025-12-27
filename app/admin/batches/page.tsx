//@/app/admin/batches/page.tsx
/* Rôle: Page module "Gestion des lots de production" (grille d'outils + cartes UI réutilisables). */
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

type BatchRole = "gestionnaire" | "opérateur" | "visiteur";

type BatchTool = {
  id:
    | "batch-create"
    | "batch-active"
    | "batch-history"
    | "batch-age"
    | "batch-rotation"
    | "batch-performance"
    | "batch-genetics"
    | "batch-renewal"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: BatchRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: BatchRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: BatchRole): string {
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

function BatchToolCard({ tool }: { tool: BatchTool }): JSX.Element {
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

export default function BatchesPage(): JSX.Element {
  const tools = [
    {
      id: "batch-create",
      title: "Création de nouveaux lots",
      summary: "Entrée de lot, paramètres de départ et affectation bâtiment.",
      href: "/admin/batches/create",
      role: "gestionnaire",
      details: [
        "Créer un lot (nom/code interne) avec date d’entrée, effectif initial, origine et bâtiment d’affectation.",
        "Définir les paramètres de référence (objectif ponte, âge cible, seuils d’alertes).",
        "Attacher les documents (certificats, bons, souches, notes vétérinaires).",
        "Tracer les mouvements initiaux (transfert/installation) et les responsables.",
        "Préparer le lot pour la saisie quotidienne (liaison production/santé/ambiance).",
      ],
      deliverables: ["Fiche lot", "Documents", "Seuils", "Affectation"],
    },
    {
      id: "batch-active",
      title: "Suivi des lots en cours",
      summary: "Vue opérationnelle des lots actifs avec états et alertes.",
      href: "/admin/batches/active",
      role: "opérateur",
      details: [
        "Lister les lots actifs avec statut (en ponte, transition, réforme).",
        "Afficher les indicateurs clés : effectif, âge, taux de ponte, anomalies récentes.",
        "Filtrer par bâtiment, période, statut et criticité.",
        "Mettre en évidence les actions à faire (vaccin, rotation, audit, entretien).",
        "Accéder rapidement aux pages liées (production quotidienne, santé, environnement).",
      ],
      deliverables: ["Liste active", "Filtres", "Alertes", "Liens rapides"],
    },
    {
      id: "batch-history",
      title: "Historique des lots",
      summary: "Archivage, clôture, traçabilité et analyses longitudinales.",
      href: "/admin/batches/history",
      role: "visiteur",
      details: [
        "Rechercher un lot clôturé par code, période, bâtiment, souche.",
        "Consulter la timeline : événements, mouvements, traitements, incidents, production.",
        "Comparer des lots historiques (mêmes souches / mêmes bâtiments).",
        "Exporter les données (audit, analyse externe, reporting).",
        "Conserver la preuve de clôture (motif, date, validations).",
      ],
      deliverables: ["Archive lot", "Timeline", "Exports"],
    },
    {
      id: "batch-age",
      title: "Suivi de l’âge des poules",
      summary: "Âge (semaines), jalons et seuils par phase de production.",
      href: "/admin/batches/age-tracking",
      role: "opérateur",
      details: [
        "Calculer automatiquement l’âge (en semaines) à partir de la date d’entrée/naissance.",
        "Afficher les jalons (début ponte, pic, décroissance, réforme).",
        "Configurer des seuils (alerte si performance anormale à un âge donné).",
        "Relier l’âge aux KPI (taux de ponte, consommation, mortalité).",
        "Préparer le planning de rotation en fonction des jalons.",
      ],
      deliverables: ["Âge/phase", "Jalons", "Alertes âge"],
    },
    {
      id: "batch-rotation",
      title: "Rotation des lots",
      summary: "Transferts, sorties, réforme et planification.",
      href: "/admin/batches/rotations",
      role: "gestionnaire",
      details: [
        "Planifier transferts (changement bâtiment/zone) avec dates et contraintes.",
        "Gérer sorties (réforme) et motifs (performance, santé, stratégie).",
        "Tracer les mouvements (qui, quand, combien) pour audit.",
        "Vérifier la capacité des bâtiments avant planification.",
        "Produire un planning lisible pour les équipes.",
      ],
      deliverables: ["Planning", "Mouvements", "Capacité vs besoin"],
    },
    {
      id: "batch-performance",
      title: "Performances par lot",
      summary: "Indicateurs, écarts vs objectifs et analyse des causes.",
      href: "/admin/batches/performance",
      role: "gestionnaire",
      details: [
        "Suivre production, taux de ponte, non-conformités qualité et tendances.",
        "Comparer au référentiel (objectif) et mesurer les écarts.",
        "Segmenter par période (semaine/mois), âge, bâtiment et événements.",
        "Croiser avec santé/ambiance (vaccins, incidents, CO2, température).",
        "Générer une synthèse actionnable (hypothèses et actions).",
      ],
      deliverables: ["KPI lot", "Écarts", "Synthèse"],
    },
    {
      id: "batch-genetics",
      title: "Génétique & souches",
      summary: "Référentiel souches, performances attendues et historique.",
      href: "/admin/batches/genetics",
      role: "gestionnaire",
      details: [
        "Maintenir la liste des souches (fournisseur, caractéristiques, objectifs).",
        "Associer une souche à un lot (traçabilité et comparaison).",
        "Conserver les performances observées vs attendues par souche.",
        "Documenter les contraintes (sensibilités, protocoles conseillés).",
        "Aider au choix de la prochaine souche selon résultats historiques.",
      ],
      deliverables: ["Référentiel souches", "Comparatifs"],
    },
    {
      id: "batch-renewal",
      title: "Plan de renouvellement",
      summary: "Prévision entrées/sorties pour continuité de production.",
      href: "/admin/batches/renewal-plan",
      role: "gestionnaire",
      details: [
        "Définir un calendrier de renouvellement (entrées/sorties) aligné sur la capacité.",
        "Anticiper la charge (conditionnement, logistique, stock d’aliments).",
        "Évaluer l’impact sur la production (trous de production / pics).",
        "Générer un plan partagé (export/print) pour coordination.",
        "Ajuster selon événements (sanitaire, performance, marché).",
      ],
      deliverables: ["Calendrier", "Prévisions", "Plan partagé"],
    },
  ] as const satisfies readonly BatchTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion des Lots de Production
            </h1>
            <p className="text-muted-foreground">
              Structurez le cycle de vie des lots, suivez la performance et
              planifiez les rotations.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Lots”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module lots">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <BatchToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Pour une UX nette, garde “Lots” comme référentiel (identité, âge,
              mouvements) et laisse “Production / Santé / Environnement”
              produire les mesures liées.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les pages cibles (`/create`, `/active`, `/history`…) pourront
            ensuite utiliser Prisma pour stocker la source de vérité et des vues
            dédiées selon le rôle.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : mets des filtres persistants (bâtiment/lot/période) et des
        liens “voir détails” plutôt que de surcharger la liste.
      </footer>
    </div>
  );
}
