//@/app/admin/finance/page.tsx
/* Rôle: Page module "Finance & comptabilité" (grille d'outils financiers + cartes réutilisables intégrées). */
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

type FinanceRole = "gestionnaire" | "opérateur" | "visiteur";

type FinanceTool = {
  id:
    | "finance-pricing"
    | "finance-egg-prices"
    | "finance-feed-prices"
    | "finance-expenses"
    | "finance-revenues"
    | "finance-entries"
    | "finance-cash"
    | "finance-projections"
    | "finance-costing"
    | "finance-profitability"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: FinanceRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: FinanceRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: FinanceRole): string {
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

function FinanceToolCard({ tool }: { tool: FinanceTool }): JSX.Element {
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

export default function FinancePage(): JSX.Element {
  const tools = [
    {
      id: "finance-pricing",
      title: "Tarifs & référentiels de prix",
      summary:
        "Centraliser les prix de vente et les coûts d’achat pour calculer les marges.",
      href: "/admin/finance/pricing",
      role: "gestionnaire",
      details: [
        "Définir prix de vente par calibre/conditionnement (plateau, boîte, colis).",
        "Définir coûts d’achat (aliments, consommables) et suivre leur historique.",
        "Versionner les grilles et appliquer une date d’effet (prix en vigueur).",
        "Relier à l’activité (production/stock) pour des marges cohérentes.",
        "Éviter les prix “en dur” dispersés dans plusieurs modules.",
      ],
      deliverables: ["Grilles tarifaires", "Historique", "Dates d’effet"],
    },
    {
      id: "finance-egg-prices",
      title: "Prix de vente des œufs",
      summary: "Gestion dédiée des tarifs de vente (focus commercial).",
      href: "/admin/finance/egg-prices",
      role: "gestionnaire",
      details: [
        "Créer des tarifs par calibre (S/M/L/XL) et par type de conditionnement.",
        "Gérer des tarifs clients (option) ou canaux (marché, grossiste).",
        "Définir périodes de validité et motifs de changement.",
        "Comparer prix actuel vs historique (tendance marché).",
        "Préparer des exports simples pour facturation (si intégrée).",
      ],
      deliverables: ["Tarifs œufs", "Historique", "Exports (option)"],
    },
    {
      id: "finance-feed-prices",
      title: "Prix des aliments",
      summary:
        "Suivre le coût de l’alimentation (poste majeur) et ses évolutions.",
      href: "/admin/finance/feed-prices",
      role: "gestionnaire",
      details: [
        "Enregistrer prix d’achat par type d’aliment (référence stock).",
        "Suivre évolution dans le temps (impact direct sur coût de revient).",
        "Relier à un fournisseur et à une commande (si module Stock actif).",
        "Détecter hausses et déclencher renégociation (option).",
        "Alimenter automatiquement les calculs de rentabilité.",
      ],
      deliverables: ["Historique prix aliments", "Lien fournisseurs", "KPI"],
    },
    {
      id: "finance-expenses",
      title: "Enregistrement des dépenses",
      summary: "Saisie/import des dépenses avec catégories et justificatifs.",
      href: "/admin/finance/expenses",
      role: "opérateur",
      details: [
        "Saisir une dépense (date, montant, catégorie, fournisseur).",
        "Joindre justificatif (facture/scan) et ajouter commentaires.",
        "Ventiler (option) par lot, bâtiment, module (maintenance, stock).",
        "Gérer statuts (brouillon → validé) pour fiabiliser les chiffres.",
        "Préparer export comptable (si besoin).",
      ],
      deliverables: ["Journal dépenses", "Catégories", "Pièces"],
    },
    {
      id: "finance-revenues",
      title: "Enregistrement des revenus",
      summary:
        "Saisie/import des revenus et rapprochement avec volumes vendus.",
      href: "/admin/finance/revenues",
      role: "opérateur",
      details: [
        "Saisir un revenu (date, montant, canal/client option).",
        "Relier au type de vente (œufs, sous-produits) et période.",
        "Comparer revenus vs volumes (si données vente disponibles).",
        "Gérer statuts de validation (brouillon/validé).",
        "Préparer un export stable (CSV) pour outil comptable.",
      ],
      deliverables: ["Journal revenus", "Validation", "Exports (option)"],
    },
    {
      id: "finance-entries",
      title: "Dépenses & revenus (journal)",
      summary: "Vue unifiée des écritures avec filtres et contrôles.",
      href: "/admin/finance/entries",
      role: "visiteur",
      details: [
        "Voir toutes les écritures (dépenses + revenus) dans une seule vue.",
        "Filtrer par période, catégorie, fournisseur, lot, bâtiment.",
        "Détecter doublons, écritures manquantes, anomalies (montant/TVA).",
        "Exporter la sélection et conserver l’historique d’exports (option).",
        "Servir de base aux projections et analyses.",
      ],
      deliverables: ["Journal", "Filtres", "Exports (option)"],
    },
    {
      id: "finance-cash",
      title: "Trésorerie",
      summary: "Encaissements/décaissements, échéances et alertes.",
      href: "/admin/finance/cash",
      role: "gestionnaire",
      details: [
        "Suivre la trésorerie sur une période (réel + prévisionnel).",
        "Gérer échéances (factures, salaires, achats, contrats).",
        "Définir alertes de tension (seuil bas) et actions recommandées.",
        "Identifier postes qui pèsent (aliments, énergie, maintenance).",
        "Préparer une synthèse simple pour pilotage.",
      ],
      deliverables: ["Prévisionnel", "Échéancier", "Alertes"],
    },
    {
      id: "finance-projections",
      title: "Projections financières (prod quotidienne & cumulée)",
      summary:
        "Projection revenus/coûts à partir de la production et des prix.",
      href: "/admin/finance/projections",
      role: "gestionnaire",
      details: [
        "Projeter revenus à partir de la production (quotidienne/cumulée) et des tarifs.",
        "Projeter coûts majeurs (aliments, énergie, maintenance) selon historiques.",
        "Comparer scénarios (prix, volumes, coûts) si tu actives des hypothèses.",
        "Visualiser l’impact sur trésorerie et rentabilité par période.",
        "Exporter une synthèse “budget” pour décision.",
      ],
      deliverables: ["Prévisions", "Scénarios (option)", "Synthèses"],
    },
    {
      id: "finance-costing",
      title: "Coût de revient par œuf",
      summary: "Calculer un coût unitaire et le comparer au prix de vente.",
      href: "/admin/finance/costing",
      role: "gestionnaire",
      details: [
        "Consolider intrants (aliments), énergie, maintenance et autres coûts.",
        "Calculer coût unitaire (par œuf ou par unité vendue) selon la période.",
        "Comparer coût vs prix de vente (marge estimée) par calibre/canal (option).",
        "Identifier leviers (réduction pertes, optimisation énergie, amélioration IC).",
        "Assurer traçabilité des hypothèses (audit interne).",
      ],
      deliverables: ["KPI coût", "Marge estimée", "Hypothèses"],
    },
    {
      id: "finance-profitability",
      title: "Rentabilité par lot",
      summary: "P&L par lot et comparaison pour piloter le renouvellement.",
      href: "/admin/finance/profitability",
      role: "gestionnaire",
      details: [
        "Consolider revenus et coûts par lot sur une période.",
        "Comparer lots (souche, bâtiment, âge) et repérer les écarts.",
        "Mettre en évidence les lots déficitaires et les causes probables.",
        "Relier aux décisions (réforme, rotation, changement aliment).",
        "Exporter un comparatif pour direction.",
      ],
      deliverables: ["P&L par lot", "Comparatifs", "Exports (option)"],
    },
  ] as const satisfies readonly FinanceTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Finance & comptabilité
            </h1>
            <p className="text-muted-foreground">
              Suivez coûts, revenus, trésorerie et rentabilité avec des vues
              fiables et auditables.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Finance”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module finance">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <FinanceToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Pour éviter les doubles saisies, fais remonter automatiquement les
              coûts issus de Stocks (achats/réceptions) et de Maintenance
              (pièces/prestataires) dans les écritures, puis laisse la Finance
              valider.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/entries`, `/cash`, `/costing`…) pourront ensuite
            appliquer des statuts (brouillon/validé) et produire des exports
            comptables stables.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : une écriture doit toujours avoir une catégorie + une pièce
        jointe (ou un motif “sans justificatif”).
      </footer>
    </div>
  );
}
