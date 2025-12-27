//@/app/admin/environmental/page.tsx
/* Rôle: Page module "Monitoring environnemental" (grille d'outils + cartes réutilisables intégrées). */
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

type EnvRole = "gestionnaire" | "opérateur" | "visiteur";

type EnvTool = {
  id:
    | "env-sensors"
    | "env-alerts"
    | "env-history"
    | "env-reports"
    | "env-lighting"
    | "env-energy"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: EnvRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: EnvRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: EnvRole): string {
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

function EnvToolCard({ tool }: { tool: EnvTool }): JSX.Element {
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

export default function EnvironmentalPage(): JSX.Element {
  const tools = [
    {
      id: "env-sensors",
      title: "Relevés & capteurs",
      summary: "Température, humidité, CO2, NH3, etc. (saisie ou import).",
      href: "/admin/environmental/sensors",
      role: "opérateur",
      details: [
        "Saisir des relevés manuels (si pas de capteurs) avec horodatage.",
        "Importer des séries depuis un fichier/API capteur (si intégré).",
        "Rattacher les mesures à un bâtiment/zone et à un type de capteur.",
        "Vérifier qualité des données (valeurs aberrantes, trous de mesure).",
        "Préparer l’exploitation par les vues historiques et alertes.",
      ],
      deliverables: ["Séries temporelles", "Qualité des données", "Exports"],
    },
    {
      id: "env-alerts",
      title: "Alertes environnementales",
      summary: "Seuils, déclenchements, acquittement et actions.",
      href: "/admin/environmental/alerts",
      role: "gestionnaire",
      details: [
        "Définir des seuils par bâtiment (ex. CO2, NH3, température).",
        "Déclencher des alertes quand un seuil est dépassé (durée + intensité).",
        "Acquitter une alerte et tracer l’action (ventilation, réglage, contrôle).",
        "Réduire les faux positifs avec hystérésis/temporisation (option).",
        "Centraliser un historique utile pour audits et amélioration continue.",
      ],
      deliverables: ["Règles", "File d’alertes", "Historique actions"],
    },
    {
      id: "env-history",
      title: "Historique des conditions",
      summary: "Recherche et comparaison par période, bâtiment, zone.",
      href: "/admin/environmental/history",
      role: "visiteur",
      details: [
        "Explorer les mesures sur une période (jour/semaine/mois).",
        "Comparer plusieurs bâtiments ou zones sur le même graphique (option).",
        "Annoter des événements (panne ventilation, canicule, maintenance).",
        "Préparer des exports pour analyses externes (BI).",
        "Conserver une trace d’exploitation (qui a consulté/exporté, option).",
      ],
      deliverables: ["Vues historiques", "Comparatifs", "Exports"],
    },
    {
      id: "env-reports",
      title: "Rapports d’ambiance",
      summary: "Synthèses prêtes à partager (quotidien/hebdo).",
      href: "/admin/environmental/reports",
      role: "visiteur",
      details: [
        "Générer une synthèse (min/max/moyenne) par bâtiment et période.",
        "Inclure incidents/alertes et commentaires opérationnels.",
        "Comparer à des cibles de confort (si tu configures des plages).",
        "Exporter un rapport standardisé (PDF/CSV selon implémentation).",
        "Aider au pilotage et à la conformité interne.",
      ],
      deliverables: ["Rapports", "Synthèses", "Exports"],
    },
    {
      id: "env-lighting",
      title: "Contrôle de l’éclairage",
      summary: "Durée, intensité, programmes et conformité.",
      href: "/admin/environmental/lighting",
      role: "opérateur",
      details: [
        "Définir/consulter le programme lumineux (durée, intensité, phases).",
        "Tracer les changements de réglage (qui/quand/pourquoi).",
        "Relier l’éclairage à la performance (taux de ponte) si tu le souhaites.",
        "Détecter dérives (heures manquantes, intensité non conforme) si données.",
        "Garder un historique exploitable en cas d’incident.",
      ],
      deliverables: [
        "Programmes",
        "Historique réglages",
        "Conformité (option)",
      ],
    },
    {
      id: "env-energy",
      title: "Suivi des consommations énergétiques",
      summary: "Énergie par bâtiment et période (pilotage + coûts).",
      href: "/admin/environmental/energy",
      role: "gestionnaire",
      details: [
        "Saisir/importer consommation (kWh, gaz, etc.) si disponible.",
        "Ventiler par bâtiment/zone/équipement (chauffage, ventilation).",
        "Suivre des KPI (kWh/jour, coût estimé) et repérer anomalies.",
        "Relier au module Finance pour coût de revient (si activé).",
        "Produire des rapports simples pour arbitrage (confort vs coût).",
      ],
      deliverables: ["KPI énergie", "Anomalies", "Lien finance"],
    },
  ] as const satisfies readonly EnvTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Monitoring environnemental
            </h1>
            <p className="text-muted-foreground">
              Surveillez l’ambiance des bâtiments : capteurs, alertes,
              historique et rapports.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Environnement”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module environnement">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <EnvToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Pour une UX robuste, standardisez les types de mesures (unité,
              précision, fréquence) et stockez toutes les mesures sous un modèle
              unique “Measurement” (avec des catégories).
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/sensors`, `/alerts`, `/history`…) pourront ensuite
            s’appuyer sur Prisma et des agrégations serveur pour rester rapides.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : affiche toujours “dernière mesure + état (OK / alerte)” en
        haut d’un bâtiment pour une lecture immédiate.
      </footer>
    </div>
  );
}
