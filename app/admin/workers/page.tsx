//@/app/admin/workers/page.tsx
/* Rôle: Page module "Gestion des travailleurs" (grille d'outils RH/terrain + cartes réutilisables intégrées). */
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

type WorkerRole = "gestionnaire" | "opérateur" | "visiteur";

type WorkerTool = {
  id:
    | "workers-directory"
    | "workers-roles-permissions"
    | "workers-shifts"
    | "workers-timesheets"
    | "workers-training"
    | "workers-health-safety"
    | "workers-contracts"
    | "workers-payroll-export"
    | "workers-activity"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: WorkerRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: WorkerRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: WorkerRole): string {
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

function WorkerToolCard({ tool }: { tool: WorkerTool }): JSX.Element {
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

export default function WorkersPage(): JSX.Element {
  const tools = [
    {
      id: "workers-directory",
      title: "Annuaire des travailleurs (CRUD)",
      summary: "Créer et gérer les fiches employés, équipes et affectations.",
      href: "/admin/workers/directory",
      role: "gestionnaire",
      details: [
        "Créer/modifier une fiche travailleur (identité, contact, poste, statut).",
        "Rattacher à une équipe et à un périmètre (site, bâtiment, zone).",
        "Gérer l’actif/inactif (départ, saisonnier) sans perdre l’historique.",
        "Stocker documents RH (contrat, habilitations, pièces) selon politique.",
        "Faciliter la recherche (filtre équipe, statut, compétence, bâtiment).",
      ],
      deliverables: [
        "Fiches travailleurs",
        "Affectations",
        "Documents (option)",
      ],
    },
    {
      id: "workers-roles-permissions",
      title: "Rôles & habilitations terrain",
      summary: "Définir qui peut faire quoi (saisie, validation, export).",
      href: "/admin/workers/permissions",
      role: "gestionnaire",
      details: [
        "Attribuer un rôle applicatif (gestionnaire / opérateur / visiteur).",
        "Définir des habilitations métier (ex. valider production, bloquer ProdLot).",
        "Restreindre par périmètre (bâtiments autorisés, lots suivis).",
        "Tracer les changements d’habilitation (audit interne).",
        "Réduire les erreurs via droits minimaux + validations.",
      ],
      deliverables: ["Matrice accès", "Historique habilitations"],
    },
    {
      id: "workers-shifts",
      title: "Planning & rotations",
      summary: "Créer des plannings (équipes, postes, astreintes).",
      href: "/admin/workers/shifts",
      role: "opérateur",
      details: [
        "Planifier des shifts (dates, plages horaires, équipe, bâtiment).",
        "Gérer rotations (matin/soir/nuit) et règles d’équilibre.",
        "Définir les postes critiques (collecte, tri, maintenance, biosécurité).",
        "Alerter sur sous-effectif / chevauchements / absences (option).",
        "Partager un planning lisible sur mobile/tablette (objectif UX).",
      ],
      deliverables: ["Planning", "Affectations", "Alertes (option)"],
    },
    {
      id: "workers-timesheets",
      title: "Pointage & heures",
      summary: "Suivre heures travaillées, absences et justification.",
      href: "/admin/workers/timesheets",
      role: "opérateur",
      details: [
        "Saisir/importer pointage (début/fin) et pauses.",
        "Gérer absences (maladie, congés) et motifs.",
        "Valider les feuilles de temps (workflow simple).",
        "Consolider par travailleur / équipe / période.",
        "Préparer les exports vers paie (si utilisé).",
      ],
      deliverables: ["Feuilles de temps", "Absences", "Validation"],
    },
    {
      id: "workers-training",
      title: "Compétences & formation",
      summary: "Suivre formations, habilitations et renouvellements.",
      href: "/admin/workers/training",
      role: "gestionnaire",
      details: [
        "Définir un référentiel de compétences (ex. biosécurité, tri qualité).",
        "Enregistrer formations suivies, dates, attestations et échéances.",
        "Alerter avant expiration d’habilitations critiques (option).",
        "Filtrer le personnel “habilité” par tâche/poste.",
        "Capitaliser sur l’historique pour planifier les formations.",
      ],
      deliverables: [
        "Référentiel compétences",
        "Dossiers formation",
        "Échéances (option)",
      ],
    },
    {
      id: "workers-health-safety",
      title: "Sécurité & incidents (HSE)",
      summary: "Déclarer incidents, quasi-accidents et actions correctives.",
      href: "/admin/workers/health-safety",
      role: "gestionnaire",
      details: [
        "Déclarer un incident (date, lieu, description, gravité).",
        "Associer un bâtiment/zone et des témoins/responsables.",
        "Définir actions correctives et échéances (suivi).",
        "Joindre preuves (photos, documents) selon politique interne.",
        "Analyser récurrences (ex. glissades, manutention, chimie).",
      ],
      deliverables: ["Registre incidents", "Actions", "Indicateurs (option)"],
    },
    {
      id: "workers-contracts",
      title: "Contrats & documents RH",
      summary: "Structurer contrats, pièces et échéances (confidentiel).",
      href: "/admin/workers/contracts",
      role: "gestionnaire",
      details: [
        "Gérer types de contrats (CDI, CDD, saisonnier) et périodes.",
        "Stocker pièces RH (documents) avec accès restreint.",
        "Suivre échéances (fin de CDD, période d’essai) avec alertes (option).",
        "Tracer l’historique des modifications (audit interne).",
        "Préparer une vue “administration” distincte de l’opérationnel.",
      ],
      deliverables: ["Contrats", "Pièces RH", "Échéances (option)"],
    },
    {
      id: "workers-payroll-export",
      title: "Export paie (si applicable)",
      summary: "Exporter heures/absences vers l’outil de paie.",
      href: "/admin/workers/payroll-export",
      role: "gestionnaire",
      details: [
        "Exporter par période (semaine/mois) selon les règles internes.",
        "Inclure totaux, heures supp, absences et validations.",
        "Tracer qui a exporté et quand (audit).",
        "Limiter l’accès (données sensibles).",
        "Prévoir un format stable (CSV) pour intégration.",
      ],
      deliverables: ["Exports paie", "Historique exports"],
    },
    {
      id: "workers-activity",
      title: "Activité & traçabilité",
      summary: "Journal des actions liées aux validations (option).",
      href: "/admin/workers/activity",
      role: "visiteur",
      details: [
        "Consulter les actions clés (validation production, blocage qualité, clôture incident).",
        "Filtrer par personne, période, module et périmètre.",
        "Aider à comprendre une décision (contexte + horodatage).",
        "Supporter les audits internes (responsabilité).",
        "Réduire les zones grises opérationnelles.",
      ],
      deliverables: ["Journal activité", "Filtres", "Exports (option)"],
    },
  ] as const satisfies readonly WorkerTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Gestion des travailleurs
            </h1>
            <p className="text-muted-foreground">
              Organisez les équipes, planifiez, tracez les habilitations et
              structurez les documents.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Travailleurs”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module travailleurs">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <WorkerToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Séparez les données “opérationnelles” (planning, pointage,
              habilitations terrain) des données “RH sensibles” (contrats,
              pièces), avec des permissions strictes.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/directory`, `/shifts`, `/timesheets`…) pourront
            ensuite ajouter des formulaires (Server Actions) et un modèle
            Prisma.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : affichez toujours “équipe du jour + périmètre” en haut, et
        gardez les actions critiques derrière une validation.
      </footer>
    </div>
  );
}
