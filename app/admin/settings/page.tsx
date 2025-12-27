//@/app/admin/settings/page.tsx
/* Rôle: Page module "Paramètres & configuration" (grille d'outils + cartes réutilisables intégrées). */
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

type SettingsRole = "gestionnaire" | "opérateur" | "visiteur";

type SettingsTool = {
  id:
    | "settings-general"
    | "settings-system"
    | "settings-units"
    | "settings-locale"
    | "settings-integrations"
    | "settings-connectors"
    | "settings-security"
    | "settings-backups"
    | "settings-data-retention"
    | "settings-ui"
    | (string & {});
  title: string;
  summary: string;
  href: string;
  role: SettingsRole;
  details: readonly string[];
  deliverables?: readonly string[];
};

function roleVariant(role: SettingsRole): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: SettingsRole): string {
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

function SettingsToolCard({ tool }: { tool: SettingsTool }): JSX.Element {
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

export default function SettingsPage(): JSX.Element {
  const tools = [
    {
      id: "settings-general",
      title: "Configuration générale",
      summary: "Paramètres de base de l’exploitation et règles globales.",
      href: "/admin/settings/general",
      role: "gestionnaire",
      details: [
        "Renseigner identité de l’exploitation (nom, sites, contacts).",
        "Définir règles de nommage (bâtiments, lots) et conventions internes.",
        "Configurer des seuils globaux (alertes, validations, statuts).",
        "Centraliser paramètres partagés entre modules.",
        "Tracer les modifications (audit interne).",
      ],
      deliverables: ["Paramètres", "Historique", "Règles globales"],
    },
    {
      id: "settings-system",
      title: "Paramètres système",
      summary: "Fonctionnement global, options techniques et diagnostics.",
      href: "/admin/settings/system",
      role: "gestionnaire",
      details: [
        "Basculer des options (fonctionnalités activées/désactivées).",
        "Configurer des limites (rétention logs, taille exports).",
        "Consulter l’état global (version, migrations, tâches planifiées).",
        "Gérer des paramètres de performance (option).",
        "Centraliser diagnostics en cas d’incident.",
      ],
      deliverables: ["Options système", "Diagnostics"],
    },
    {
      id: "settings-units",
      title: "Unités & référentiels",
      summary: "Unités, listes contrôlées, catégories et normalisation.",
      href: "/admin/settings/units",
      role: "gestionnaire",
      details: [
        "Gérer unités (kg, L, kWh) et conversions (si nécessaire).",
        "Définir listes contrôlées (motifs, statuts, catégories).",
        "Éviter les saisies libres là où l’audit exige des valeurs stables.",
        "Centraliser référentiels partagés (qualité, stock, santé).",
        "Assurer cohérence pour rapports et exports.",
      ],
      deliverables: ["Unités", "Listes contrôlées"],
    },
    {
      id: "settings-locale",
      title: "Langue, région & formats",
      summary: "Formats de date/nombre, fuseau horaire et conventions.",
      href: "/admin/settings/locale",
      role: "opérateur",
      details: [
        "Définir fuseau horaire (impact sur journaux et rapports).",
        "Configurer formats (date, décimales, séparateurs).",
        "Choisir la langue de l’interface si multi-langue.",
        "Garantir cohérence des exports (CSV) avec les outils externes.",
        "Limiter les erreurs de lecture (ex. 1,5 vs 1.5).",
      ],
      deliverables: ["Préférences locales", "Formats"],
    },
    {
      id: "settings-integrations",
      title: "Intégrations",
      summary: "Connexions aux services externes (capteurs, BI, etc.).",
      href: "/admin/settings/integrations",
      role: "gestionnaire",
      details: [
        "Configurer intégrations (capteurs ambiance, import stock, etc.).",
        "Gérer clés/API, endpoints, et paramètres de synchronisation.",
        "Tester une intégration et consulter les erreurs de sync.",
        "Définir la fréquence d’import (si applicable).",
        "Tracer les changements (qui/quand).",
      ],
      deliverables: ["Intégrations", "Tests", "Logs sync (option)"],
    },
    {
      id: "settings-connectors",
      title: "Connecteurs API",
      summary: "API internes/externes, webhooks et accès.",
      href: "/admin/settings/connectors",
      role: "gestionnaire",
      details: [
        "Créer des tokens/clients (si tu exposes une API).",
        "Gérer webhooks (événements: prod validée, alerte, blocage lot).",
        "Limiter les permissions par connecteur (principe du moindre privilège).",
        "Auditer l’usage (appels, erreurs, quotas).",
        "Faciliter les intégrations futures (BI, ERP).",
      ],
      deliverables: ["Tokens/clients", "Webhooks", "Audit usage (option)"],
    },
    {
      id: "settings-security",
      title: "Sécurité",
      summary: "Politiques d’accès et paramètres sensibles.",
      href: "/admin/settings/security",
      role: "gestionnaire",
      details: [
        "Définir politiques (durée session, exigences de mot de passe si applicable).",
        "Configurer exigences pour actions critiques (double validation, 2FA option).",
        "Gérer périmètres d’accès (bâtiments/équipes) si multi-site.",
        "Suivre les événements de sécurité (logs).",
        "Préparer des exports pour audit de sécurité interne.",
      ],
      deliverables: ["Politiques", "Logs (option)", "Paramètres sensibles"],
    },
    {
      id: "settings-backups",
      title: "Sauvegardes & restauration",
      summary: "Rétention, exécutions et restauration testée.",
      href: "/admin/settings/backups",
      role: "gestionnaire",
      details: [
        "Définir stratégie de sauvegarde (fréquence, rétention).",
        "Lancer une sauvegarde manuelle (si besoin).",
        "Consulter l’historique des sauvegardes (succès/échec).",
        "Tester une restauration (procédure) pour être prêt en incident.",
        "Documenter la stratégie (preuve interne).",
      ],
      deliverables: ["Stratégie", "Historique backups", "Procédure restore"],
    },
    {
      id: "settings-data-retention",
      title: "Rétention des données",
      summary: "Conservation, purge, archivage et conformité interne.",
      href: "/admin/settings/data-retention",
      role: "gestionnaire",
      details: [
        "Définir la durée de conservation par type de donnée (logs, exports, pièces).",
        "Gérer archivage vs suppression (selon obligations).",
        "Limiter la croissance des tables (performance).",
        "Centraliser les règles pour audits.",
        "Appliquer des purges planifiées (option).",
      ],
      deliverables: ["Règles rétention", "Archivage", "Purge (option)"],
    },
    {
      id: "settings-ui",
      title: "Préférences d’affichage",
      summary: "Thème, densité, préférences utilisateur et ergonomie.",
      href: "/admin/settings/ui",
      role: "opérateur",
      details: [
        "Gérer thème (clair/sombre) et préférences de confort.",
        "Choisir densité d’affichage (tableaux compacts vs confort).",
        "Définir options par défaut (filtres persistants, période).",
        "Améliorer accessibilité (taille texte, contraste) si souhaité.",
        "Réduire la friction sur tablette (usage terrain).",
      ],
      deliverables: ["Préférences UI", "Defaults affichage"],
    },
  ] as const satisfies readonly SettingsTool[];

  return (
    <div className="container mx-auto space-y-6 p-6">
      <header className="space-y-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Paramètres & configuration
            </h1>
            <p className="text-muted-foreground">
              Centralisez la configuration de l’application, les référentiels et
              les options système.
            </p>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <Badge variant="outline" className="font-normal">
              {tools.length} outils
            </Badge>
            <Badge variant="secondary" className="font-normal">
              Module “Paramètres”
            </Badge>
          </div>
        </div>

        <Separator />
      </header>

      <section aria-label="Outils du module paramètres">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <SettingsToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section aria-label="Conseil de structuration" className="pt-2">
        <Card className="bg-muted/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conseil</CardTitle>
            <CardDescription>
              Évite les “paramètres dispersés” : chaque valeur configurable doit
              avoir un propriétaire (module) et une valeur par défaut, sinon les
              écrans deviennent difficiles à maintenir.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Les sous-pages (`/general`, `/integrations`, `/backups`…) pourront
            ensuite utiliser Prisma pour stocker la configuration et des
            validations pour empêcher des réglages incohérents.
          </CardContent>
        </Card>
      </section>

      <footer className="text-xs text-muted-foreground">
        Astuce UX : affiche un résumé “paramètres critiques” (alertes,
        rétention, sauvegardes) en haut de la page.
      </footer>
    </div>
  );
}
