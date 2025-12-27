//@/app/admin/compliance/page.tsx
/* Rôle: Page module "Conformité réglementaire" (grille d'outils + cartes réutilisables intégrées). */
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

type ComplianceRole = "gestionnaire" | "opérateur" | "visiteur";

type ComplianceTool = {
  id:
    | "comp-registry"
    | "comp-documents"
    | "comp-audits"
    | "comp-controls"
    | "comp-certifications"
    | "comp-alerts"
    | "comp-welfare"
    | "comp-evidence"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: ComplianceRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(
  role: ComplianceRole
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

function roleLabel(role: ComplianceRole): string {
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

function ComplianceToolCard({ tool }: { tool: ComplianceTool }): JSX.Element {
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

export default function CompliancePage(): JSX.Element {
  const tools = [
    {
      id: "comp-registry",
      title: "Registre d’élevage numérique",
      summary: "Consolidation des événements obligatoires avec export.",
      href: "/admin/compliance/registry",
      role: "gestionnaire",
      details: [
        "Consolider événements obligatoires (lots, traitements, mortalité, analyses, incidents).",
        "Organiser par période et périmètre (bâtiment/lot) pour retrouver vite.",
        "Verrouiller/valider une période (option) pour fiabiliser les exports.",
        "Produire exports standardisés (audit, contrôle officiel).",
        "Tracer les modifications (qui/quand/pourquoi).",
      ],
      deliverables: ["Registre", "Exports", "Historique"],
    },
    {
      id: "comp-documents",
      title: "Documents officiels",
      summary: "Génération, modèles, versioning et archivage.",
      href: "/admin/compliance/documents",
      role: "gestionnaire",
      details: [
        "Créer des modèles de documents (attestations, rapports, registres).",
        "Générer un document à partir des données (période, lot, site).",
        "Versionner les modèles et conserver l’historique des éditions.",
        "Joindre des pièces (PDF, scans) et classer par thème.",
        "Assurer une recherche rapide (tags, filtres, statut).",
      ],
      deliverables: ["Modèles", "Documents générés", "Versions"],
    },
    {
      id: "comp-audits",
      title: "Audits internes programmés",
      summary: "Planification, constats, actions correctives et clôture.",
      href: "/admin/compliance/audits",
      role: "gestionnaire",
      details: [
        "Planifier audits (calendrier, périmètre, référentiel).",
        "Saisir constats, gravité, preuves et responsables.",
        "Créer un plan d’actions correctives avec échéances.",
        "Suivre l’avancement (à faire/en cours/terminé) et valider la clôture.",
        "Produire une synthèse prête à partager.",
      ],
      deliverables: ["Plans d’audit", "Constats", "Actions", "Synthèses"],
    },
    {
      id: "comp-controls",
      title: "Suivi des contrôles officiels",
      summary: "Préparation, déroulé, résultats et suites.",
      href: "/admin/compliance/controls",
      role: "gestionnaire",
      details: [
        "Enregistrer un contrôle (date, organisme, périmètre, documents demandés).",
        "Préparer un dossier (preuves, registres, analyses, checklists).",
        "Saisir les observations, écarts et exigences de mise en conformité.",
        "Créer des actions de suite et suivre la clôture.",
        "Conserver l’historique complet pour les contrôles futurs.",
      ],
      deliverables: ["Dossiers contrôle", "Résultats", "Actions de suite"],
    },
    {
      id: "comp-certifications",
      title: "Certifications & échéances",
      summary: "Suivi des certifications, renouvellements et preuves.",
      href: "/admin/compliance/certifications",
      role: "gestionnaire",
      details: [
        "Lister certifications (type, périmètre, date de validité).",
        "Joindre preuves et documents de certification.",
        "Gérer échéances et renouvellements (rappels).",
        "Tracer les changements (nouvelle version, extension de périmètre).",
        "Préparer un dossier complet par certification.",
      ],
      deliverables: ["Référentiel certifications", "Échéances", "Dossiers"],
    },
    {
      id: "comp-alerts",
      title: "Alertes réglementaires",
      summary: "Rappels d’échéances, obligations et suivi d’acquittement.",
      href: "/admin/compliance/alerts",
      role: "opérateur",
      details: [
        "Définir alertes sur échéances (documents, audits, contrôles, certifications).",
        "Centraliser file d’alertes et leur statut (nouvelle/en cours/clôturée).",
        "Assigner un responsable et une action attendue.",
        "Tracer acquittement et pièces justificatives.",
        "Mesurer le respect des délais (SLA interne).",
      ],
      deliverables: ["File d’alertes", "Historique", "Indicateurs délais"],
    },
    {
      id: "comp-welfare",
      title: "Conformité bien-être animal",
      summary: "Checklists, exigences, preuves et suivi.",
      href: "/admin/compliance/welfare",
      role: "gestionnaire",
      details: [
        "Formaliser les exigences (densité, accès, environnement, soins).",
        "Utiliser des checklists et stocker les preuves d’exécution.",
        "Suivre les écarts et actions correctives (liens vers Santé/Bâtiments).",
        "Historiser les contrôles et les améliorations.",
        "Préparer des exports pour audit et communication interne.",
      ],
      deliverables: ["Checklists", "Preuves", "Actions"],
    },
    {
      id: "comp-evidence",
      title: "Archivage des preuves",
      summary: "Bibliothèque documentaire centralisée pour audits.",
      href: "/admin/compliance/evidence",
      role: "visiteur",
      details: [
        "Centraliser les preuves (docs, scans, photos) avec tags.",
        "Relier une preuve à un événement (lot, ProdLot, audit, contrôle).",
        "Gérer droits d’accès (lecture/édition) selon rôles.",
        "Assurer une recherche rapide (full-text si tu l’ajoutes).",
        "Garantir la rétention (politique de conservation).",
      ],
      deliverables: ["Bibliothèque preuves", "Tags", "Liens événements"],
    },
  ] as const satisfies readonly ComplianceTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Conformité réglementaire
            </h1>
            <p className="text-muted-foreground">
              Pilotez registres, audits, contrôles et preuves avec une
              traçabilité prête pour inspection.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Conformité”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module conformité">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <ComplianceToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Pour éviter la duplication, faites de “Conformité” le point
              d’entrée des preuves et échéances, et reliez-y les événements
              (santé, qualité, stock) plutôt que de copier les documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/registry`, `/audits`, `/evidence`…) pourront
            ensuite appliquer des validations (périodes verrouillées) et des
            exports standardisés.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : une “preuve” doit toujours être reliée à un contexte
        (période + bâtiment/lot) pour être retrouvée en moins de 10 secondes.
      </footer>
    </div>
  );
}
