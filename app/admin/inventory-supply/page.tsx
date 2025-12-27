//@/app/admin/inventory-supply/page.tsx
/* Rôle: Page module "Stocks & Approvisionnements" (grille d'outils + cartes réutilisables intégrées). */
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

type InventoryRole = "gestionnaire" | "opérateur" | "visiteur";

type InventoryTool = {
  id:
    | "inv-catalog"
    | "inv-stock"
    | "inv-movements"
    | "inv-inventory"
    | "inv-suppliers"
    | "inv-purchases"
    | "inv-replenishment"
    | "inv-quality"
    | "inv-losses"
    | "inv-contracts"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: InventoryRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: InventoryRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: InventoryRole): string {
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

function InventoryToolCard({ tool }: { tool: InventoryTool }): JSX.Element {
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

export default function InventorySupplyPage(): JSX.Element {
  const tools = [
    {
      id: "inv-catalog",
      title: "Catalogue articles",
      summary:
        "Référentiel aliments, consommables, pièces et équipements stockés.",
      href: "/admin/inventory-supply/catalog",
      role: "gestionnaire",
      details: [
        "Créer des articles avec catégorie (aliment, consommable, pièce, emballage).",
        "Définir unité (kg, sac, pièce), conditionnements, codes internes et TVA (si besoin).",
        "Gérer des attributs critiques (DLUO/DLC, lot fournisseur, traçabilité).",
        "Maintenir un historique de prix de référence (achat) et de fournisseurs habituels.",
        "Faciliter la saisie des mouvements et achats grâce au référentiel propre.",
      ],
      deliverables: [
        "Référentiel articles",
        "Unités",
        "Historique prix (option)",
      ],
    },
    {
      id: "inv-stock",
      title: "Niveaux de stock",
      summary: "Vue stock actuel par site/bâtiment, alertes et couverture.",
      href: "/admin/inventory-supply/stock",
      role: "opérateur",
      details: [
        "Consulter stock disponible par article et emplacement (site, bâtiment, zone).",
        "Afficher couverture (jours) si consommation moyenne renseignée.",
        "Mettre en évidence ruptures et stocks bas.",
        "Accéder aux détails (mouvements récents, lots, dates).",
        "Préparer les décisions de réapprovisionnement.",
      ],
      deliverables: [
        "Stock actuel",
        "Couverture (option)",
        "Alertes stock bas",
      ],
    },
    {
      id: "inv-movements",
      title: "Mouvements & rotation FIFO",
      summary: "Entrées/sorties/transferts, lots, et rotation (FIFO).",
      href: "/admin/inventory-supply/movements",
      role: "opérateur",
      details: [
        "Saisir entrées (réception), sorties (consommation), transferts et ajustements.",
        "Gérer la rotation FIFO sur les articles concernés (péremption/lot).",
        "Tracer les lots fournisseurs (si applicable) et les dates associées.",
        "Documenter les mouvements (motif, responsable, pièce jointe).",
        "Proposer une vue d’audit (qui a fait quoi, quand).",
      ],
      deliverables: ["Journal mouvements", "Traçabilité lots", "FIFO"],
    },
    {
      id: "inv-inventory",
      title: "Inventaire physique & valorisation",
      summary: "Comptage, écarts et valorisation du stock.",
      href: "/admin/inventory-supply/inventory",
      role: "gestionnaire",
      details: [
        "Lancer une campagne d’inventaire (période, périmètre, emplacement).",
        "Saisir comptages, comparer à la théorie, gérer les écarts.",
        "Justifier les ajustements (perte, casse, erreur, transfert manquant).",
        "Produire la valorisation (selon méthode : coût moyen / dernier prix, à définir).",
        "Archiver l’inventaire (preuve et historique).",
      ],
      deliverables: ["Campagnes inventaire", "Écarts", "Valorisation"],
    },
    {
      id: "inv-suppliers",
      title: "Fournisseurs (référentiel)",
      summary:
        "Fiches fournisseurs, contacts, conditions, qualité et historique.",
      href: "/admin/inventory-supply/suppliers",
      role: "gestionnaire",
      details: [
        "Créer/mettre à jour fournisseurs (contacts, adresses, référents).",
        "Gérer conditions (délais, incoterms, minimum commande, paiement).",
        "Suivre un scoring simple (qualité, ponctualité, litiges) si souhaité.",
        "Relier aux articles (fournisseurs privilégiés) et aux achats.",
        "Éviter les doublons avec Maintenance/Finance via un référentiel unique.",
      ],
      deliverables: ["Fiche fournisseur", "Conditions", "Historique achats"],
    },
    {
      id: "inv-purchases",
      title: "Achats (commandes → réceptions)",
      summary: "Workflow achat: demande, commande, réception, écarts et docs.",
      href: "/admin/inventory-supply/purchases",
      role: "gestionnaire",
      details: [
        "Créer une commande (articles, quantités, prix, date attendue).",
        "Réceptionner (quantités reçues, lots, DLUO) et gérer les écarts.",
        "Joindre documents (BL, facture, certificats matière première).",
        "Déclencher un contrôle qualité à réception si nécessaire.",
        "Mettre à jour le stock automatiquement à la réception (selon design).",
      ],
      deliverables: ["Commandes", "Réceptions", "Écarts", "Documents"],
    },
    {
      id: "inv-replenishment",
      title: "Réapprovisionnement",
      summary: "Seuils mini, suggestions et suivi des ruptures.",
      href: "/admin/inventory-supply/replenishment",
      role: "opérateur",
      details: [
        "Définir seuil mini / stock cible par article et emplacement.",
        "Générer des suggestions d’achat selon consommation et couverture.",
        "Regrouper par fournisseur pour optimiser les commandes.",
        "Suivre les retards et ruptures (impact opérationnel).",
        "Historiser les décisions (commande passée / report / substitution).",
      ],
      deliverables: ["Seuils", "Suggestions", "Suivi ruptures"],
    },
    {
      id: "inv-quality",
      title: "Qualité des matières premières",
      summary: "Contrôles réception, non-conformités et décisions.",
      href: "/admin/inventory-supply/quality",
      role: "gestionnaire",
      details: [
        "Enregistrer contrôles qualité à réception (conforme/non conforme).",
        "Tracer non-conformités (photo, lot, fournisseur, action corrective).",
        "Décider (accepté, bloqué, retourné, déclassé) et suivre la clôture.",
        "Produire des indicateurs (taux NC par fournisseur/produit).",
        "Relier au module Conformité si tu veux des preuves d’audit centralisées.",
      ],
      deliverables: ["Contrôles", "Non-conformités", "Stats fournisseur"],
    },
    {
      id: "inv-losses",
      title: "Pertes & non-conformités stock",
      summary: "Casse, péremption, vols/écarts et traçabilité des pertes.",
      href: "/admin/inventory-supply/losses",
      role: "opérateur",
      details: [
        "Déclarer des pertes (casse, péremption, erreur, incident).",
        "Relier la perte à un article/lot et un emplacement.",
        "Mettre à jour le stock via un mouvement d’ajustement documenté.",
        "Analyser les causes récurrentes et proposer des actions.",
        "Fournir une vue synthèse pour finance (impact coût).",
      ],
      deliverables: ["Journal pertes", "Causes", "Impact (option)"],
    },
    {
      id: "inv-contracts",
      title: "Contrats & conditions fournisseurs",
      summary: "Contrats cadres, SLA, documents et échéances.",
      href: "/admin/inventory-supply/contracts",
      role: "gestionnaire",
      details: [
        "Gérer les contrats (dates, conditions, documents) liés aux fournisseurs.",
        "Suivre les échéances et renouvellements avec alertes.",
        "Relier contrats aux familles d’articles (aliment, emballage, etc.).",
        "Aider Maintenance/Finance à référencer les contrats sans doublonner.",
        "Centraliser la preuve documentaire.",
      ],
      deliverables: ["Contrats", "Échéances", "Documents"],
    },
  ] as const satisfies readonly InventoryTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Stocks & Approvisionnements
            </h1>
            <p className="text-muted-foreground">
              Pilotez articles, stocks, achats et fournisseurs avec traçabilité
              et règles simples.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Stocks”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module stocks et approvisionnements">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <InventoryToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Sépare “Référentiel” (articles/fournisseurs) et “Opérations”
              (mouvements/achats). Les opérations doivent toujours référencer le
              référentiel, jamais le dupliquer.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/catalog`, `/movements`, `/purchases`…) pourront
            ensuite utiliser Prisma et des validations (ex. réception = seule
            action qui augmente le stock).
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : impose des “motifs” de mouvement (consommation, transfert,
        casse, inventaire) pour garder des stats fiables.
      </footer>
    </div>
  );
}
