//@/app/admin/quality/page.tsx
/* Rôle: Page module "Qualité & Traçabilité des Œufs" (grille d'outils + cartes réutilisables intégrées). */
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

type QualityRole = "gestionnaire" | "opérateur" | "visiteur";

type QualityTool = {
  id:
    | "quality-grading"
    | "quality-defects"
    | "quality-prodlot"
    | "quality-labels"
    | "quality-lab"
    | "quality-recalls"
    | "quality-coldchain"
    | "quality-procedures"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: QualityRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: QualityRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: QualityRole): string {
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

function QualityToolCard({ tool }: { tool: QualityTool }): JSX.Element {
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

export default function QualityPage(): JSX.Element {
  const tools = [
    {
      id: "quality-grading",
      title: "Calibrage & catégories",
      summary:
        "Tri par poids/catégorie (S/M/L/XL) et réglages de classification.",
      href: "/admin/quality/grading",
      role: "opérateur",
      details: [
        "Définir les règles de calibrage (seuils de poids par catégorie).",
        "Enregistrer la configuration utilisée (traçabilité des paramètres).",
        "Suivre les volumes par catégorie sur une période.",
        "Détecter dérives (sur-représentation d’un calibre) et investiguer.",
        "Préparer les données pour conditionnement et vente.",
      ],
      deliverables: ["Règles de tri", "Stats calibres", "Historique config"],
    },
    {
      id: "quality-defects",
      title: "Non-conformités (casse / fêlure / sale)",
      summary: "Saisie et suivi des défauts, décisions et actions correctives.",
      href: "/admin/quality/defects",
      role: "opérateur",
      details: [
        "Enregistrer les défauts (cassé, fêlé, sale, forme/couleur atypique).",
        "Qualifier la gravité et proposer une action (rebut / déclassé / reconditionné).",
        "Associer cause probable (manutention, matériel, collecte, stockage).",
        "Produire des indicateurs (taux de NC par lot/bâtiment/jour).",
        "Suivre les actions correctives et vérifier l’amélioration.",
      ],
      deliverables: ["Journal NC", "Taux NC", "Actions correctives"],
    },
    {
      id: "quality-prodlot",
      title: "Traçabilité ProdLot (CRUD)",
      summary:
        "Lots d’œufs traçables : origine, date, quantités, état et historique.",
      href: "/admin/quality/prodlot",
      role: "gestionnaire",
      details: [
        "Créer un ProdLot (lot d’œufs) lié à l’origine (lot de pondeuses/bâtiment).",
        "Enregistrer date, quantités, calibres et événements qualité.",
        "Gérer le statut (en attente → conditionné → expédié / bloqué).",
        "Reconstituer l’historique par plateau/boîte/colis/palette (si modélisé).",
        "Préparer l’audit : recherche rapide et export des preuves.",
      ],
      deliverables: ["Fiche ProdLot", "Historique", "Exports audit"],
    },
    {
      id: "quality-labels",
      title: "Étiquettes & QR codes",
      summary: "Génération d’identifiants uniques et étiquettes scannables.",
      href: "/admin/quality/labels",
      role: "opérateur",
      details: [
        "Générer un identifiant unique par ProdLot (ou par unité logistique).",
        "Créer l’étiquette (texte + QR code) prête à imprimer.",
        "Scanner pour retrouver instantanément la fiche ProdLot.",
        "Tracer les impressions (quand, qui, combien) et les réimpressions.",
        "Réduire les erreurs en conditionnement grâce au scan.",
      ],
      deliverables: ["QR/Étiquette", "Historique impressions"],
    },
    {
      id: "quality-lab",
      title: "Analyses labo & certificats",
      summary: "Résultats, documents, seuils et alertes en cas de dépassement.",
      href: "/admin/quality/lab",
      role: "gestionnaire",
      details: [
        "Enregistrer analyses (salmonelle, antibio, autres paramètres).",
        "Joindre les rapports et certificats (PDF) et garder une archive durable.",
        "Configurer des seuils et déclencher des alertes de dépassement.",
        "Relier les analyses aux ProdLot / périodes / bâtiments.",
        "Préparer le dossier d’audit (recherche + export).",
      ],
      deliverables: ["Dossier analyses", "Seuils", "Alertes", "Archives"],
    },
    {
      id: "quality-recalls",
      title: "Retours & rappels produit",
      summary:
        "Non-conformités clients, investigations et rappel si nécessaire.",
      href: "/admin/quality/recalls",
      role: "gestionnaire",
      details: [
        "Enregistrer un retour client (motif, lot concerné, preuves).",
        "Investiguer rapidement via traçabilité (ProdLot → origine → dates).",
        "Décider actions (blocage, retrait, rappel, communication).",
        "Tracer toutes les étapes (qui décide, quand, quelles preuves).",
        "Conserver un historique exploitable pour prévention.",
      ],
      deliverables: ["Dossier retour", "Plan d’action", "Historique rappel"],
    },
    {
      id: "quality-coldchain",
      title: "Chaîne du froid & stockage",
      summary:
        "Suivi température/hygrométrie et incidents de stockage/transport.",
      href: "/admin/quality/coldchain",
      role: "opérateur",
      details: [
        "Enregistrer températures de stockage (et transport si disponible).",
        "Détecter incidents (rupture, dépassement, durée).",
        "Relier incidents à ProdLot/expéditions pour analyse.",
        "Aider à décider (bloquer, déclasser, recontrôler).",
        "Produire un registre consultable pour audit.",
      ],
      deliverables: ["Registre froid", "Incidents", "Décisions"],
    },
    {
      id: "quality-procedures",
      title: "PMS & procédures",
      summary: "Procédures standardisées, checklists et preuve d’exécution.",
      href: "/admin/quality/procedures",
      role: "gestionnaire",
      details: [
        "Formaliser procédures (nettoyage, tri, conditionnement, stockage).",
        "Publier checklists et suivre l’exécution (qui/quand).",
        "Gérer versions et dates d’entrée en vigueur.",
        "Rattacher preuves (photos, documents, audits).",
        "Supporter les audits internes et réglementaires.",
      ],
      deliverables: ["Procédures", "Checklists", "Versions", "Preuves"],
    },
  ] as const satisfies readonly QualityTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Qualité & Traçabilité des Œufs
            </h1>
            <p className="text-muted-foreground">
              Sécurisez le produit : tri, traçabilité, analyses, incidents et
              dossiers d’audit.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Qualité”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module qualité">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <QualityToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Modélisez ProdLot comme “source de vérité” et reliez-y calibrage,
              non-conformités, analyses et incidents froid : cela simplifie la
              traçabilité et les rappels.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/grading`, `/prodlot`, `/labels`…) pourront ensuite
            exposer des listes filtrables, un détail ProdLot, et des actions
            sécurisées (validation, blocage, clôture).
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : privilégiez la recherche rapide (scan QR → fiche) + un
        statut visible (OK / à vérifier / bloqué).
      </footer>
    </div>
  );
}
