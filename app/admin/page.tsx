//@/app/admin/page.tsx
/* Rôle: Tableau de bord principal de l'administrateur (liste des modules + outils détaillés). */
"use client";

import Link from "next/link";
import type { ElementType, JSX } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart3,
  Building2,
  ClipboardList,
  DollarSign,
  HeartPulse,
  Package,
  Package2,
  Scale,
  Settings,
  ShieldCheck,
  Thermometer,
  Users,
  Wrench,
} from "lucide-react";

type Role = "gestionnaire" | "opérateur" | "visiteur";

type Tool = {
  id: string;
  title: string;
  detail: string;
  outputs?: readonly string[];
};

type ModuleTheme = {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  borderHover: string;
  toolBorder: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  href: string;
  role: Role;
  theme: ModuleTheme;
  tools: readonly Tool[];
};

function roleVariant(role: Role): "default" | "secondary" | "outline" {
  switch (role) {
    case "gestionnaire":
      return "default";
    case "opérateur":
      return "secondary";
    case "visiteur":
      return "outline";
  }
}

function roleLabel(role: Role): string {
  switch (role) {
    case "gestionnaire":
      return "Gestionnaire";
    case "opérateur":
      return "Opérateur";
    case "visiteur":
      return "Visiteur";
  }
}

export default function AdminPage(): JSX.Element {
  const modules = [
    {
      id: "buildings",
      title: "Gestion des bâtiments",
      description:
        "Infrastructures, zones, capacités et implantation du matériel.",
      icon: Building2,
      href: "/admin/buildings",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-blue-50 dark:bg-blue-950",
        iconText: "text-blue-600 dark:text-blue-300",
        badgeBg: "bg-blue-600/10 dark:bg-blue-400/10",
        badgeText: "text-blue-700 dark:text-blue-200",
        borderHover: "hover:border-blue-500/40",
        toolBorder: "border-blue-600/40 dark:border-blue-300/40",
      },
      tools: [
        {
          id: "buildings-crud",
          title: "Bâtiments (CRUD)",
          detail:
            "Créer/mettre à jour bâtiments, plans, capacité, zones (ponte, stockage, conditionnement), et rattacher documents (plans, photos, contrôles).",
          outputs: [
            "Fiches bâtiment",
            "Liste zones",
            "Historique modifications",
          ],
        },
        {
          id: "buildings-assets",
          title: "Équipements implantés",
          detail:
            "Inventorier les équipements “en place” (ventilation, mangeoires, éclairage) et les relier à leur état, garantie, et historique d’intervention.",
          outputs: ["Inventaire par bâtiment", "Équipement → interventions"],
        },
        {
          id: "buildings-maint",
          title: "Entretien des bâtiments",
          detail:
            "Centraliser demandes, préventif/correctif, contrôles périodiques et coûts associés, avec suivi d’avancement (à faire, en cours, clôturé).",
          outputs: ["Tickets", "Planning", "Coûts par site"],
        },
      ],
    },
    {
      id: "batches",
      title: "Gestion des lots",
      description: "Suivi de vie du lot (entrée, âge, performance, rotation).",
      icon: Package,
      href: "/admin/batches",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-green-50 dark:bg-green-950",
        iconText: "text-green-600 dark:text-green-300",
        badgeBg: "bg-green-600/10 dark:bg-green-400/10",
        badgeText: "text-green-700 dark:text-green-200",
        borderHover: "hover:border-green-500/40",
        toolBorder: "border-green-600/40 dark:border-green-300/40",
      },
      tools: [
        {
          id: "batches-create",
          title: "Création & entrée de lot",
          detail:
            "Définir souche/génétique, date d’entrée, effectif, bâtiment d’affectation, et paramètres de départ (objectif ponte, protocole).",
          outputs: ["Fiche lot", "Affectation bâtiment", "Effectif initial"],
        },
        {
          id: "batches-aging",
          title: "Âge & rotation",
          detail:
            "Calculer l’âge (semaines), programmer les rotations et sorties, et tracer les mouvements (transferts bâtiment, réforme).",
          outputs: ["Chronologie", "Mouvements", "Alertes échéances"],
        },
        {
          id: "batches-performance",
          title: "Performance par lot",
          detail:
            "Comparer production, taux de ponte et écarts vs objectifs; corréler avec santé et ambiance (température/CO2) pour identifier les causes.",
          outputs: ["KPI lot", "Écarts vs cible", "Comparatifs"],
        },
        {
          id: "batches-history",
          title: "Historique & archivage",
          detail:
            "Conserver l’historique complet (entrées, traitements, incidents, production) pour analyses et conformité.",
          outputs: ["Archive lot", "Exports"],
        },
      ],
    },
    {
      id: "daily-production",
      title: "Production quotidienne",
      description:
        "Saisie opérationnelle + contrôles de cohérence jour par jour.",
      icon: ClipboardList,
      href: "/admin/daily-production",
      role: "opérateur",
      theme: {
        iconBg: "bg-purple-50 dark:bg-purple-950",
        iconText: "text-purple-600 dark:text-purple-300",
        badgeBg: "bg-purple-600/10 dark:bg-purple-400/10",
        badgeText: "text-purple-700 dark:text-purple-200",
        borderHover: "hover:border-purple-500/40",
        toolBorder: "border-purple-600/40 dark:border-purple-300/40",
      },
      tools: [
        {
          id: "prod-entry",
          title: "Saisie journalière",
          detail:
            "Enregistrer quantité produite par lot/bâtiment, événements (incident, casse), et validations (responsable, commentaire).",
          outputs: ["Journal", "Statut validation"],
        },
        {
          id: "prod-controls",
          title: "Contrôles & anomalies",
          detail:
            "Détecter les écarts (chute anormale, incohérences vs effectif) et déclencher une action (alerte, ticket santé/ambiance).",
          outputs: ["Liste anomalies", "Alertes"],
        },
        {
          id: "prod-trends",
          title: "Tendances & comparaison J-1",
          detail:
            "Visualiser tendances, comparer jour à jour et par semaine, avec filtres (lot, bâtiment, période).",
          outputs: ["Graphes", "Comparatifs"],
        },
        {
          id: "prod-projections",
          title: "Projections opérationnelles",
          detail:
            "Estimer la production à court terme à partir de l’historique et de l’âge du lot (pour planifier conditionnement et logistique).",
          outputs: ["Prévisions", "Capacité vs besoin"],
        },
      ],
    },
    {
      id: "quality",
      title: "Qualité & Traçabilité des Œufs",
      description:
        "Contrôle qualité, non-conformités, lots de production et étiquetage.",
      icon: ShieldCheck,
      href: "/admin/quality",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-amber-50 dark:bg-amber-950",
        iconText: "text-amber-600 dark:text-amber-300",
        badgeBg: "bg-amber-600/10 dark:bg-amber-400/10",
        badgeText: "text-amber-700 dark:text-amber-200",
        borderHover: "hover:border-amber-500/40",
        toolBorder: "border-amber-600/40 dark:border-amber-300/40",
      },
      tools: [
        {
          id: "quality-grading",
          title: "Calibrage & classification",
          detail:
            "Classer par poids et catégorie (S/M/L/XL), définir règles de tri, et conserver les paramètres utilisés (audit).",
          outputs: ["Règles calibrage", "Stats calibres"],
        },
        {
          id: "quality-defects",
          title: "Non-conformités (casse/saleté/fêlure)",
          detail:
            "Saisir défauts, cause probable, photo/justificatif, et décider du traitement (rebut, déclassé, reconditionnement).",
          outputs: ["Taux NC", "Motifs", "Décisions"],
        },
        {
          id: "quality-trace-prodlot",
          title: "Traçabilité ProdLot (CRUD)",
          detail:
            "Créer des lots d’œufs (ProdLot) reliés à l’origine (lot pondeuses), date, quantité, calibres, état (attente/conditionné) et événements.",
          outputs: ["Fiche ProdLot", "Historique complet"],
        },
        {
          id: "quality-labels",
          title: "Étiquettes & QR code",
          detail:
            "Générer un identifiant unique, produire étiquette/QR, et retrouver rapidement un ProdLot (scan) pour audit ou rappel.",
          outputs: ["Étiquette", "QR", "Recherche rapide"],
        },
        {
          id: "quality-lab",
          title: "Analyses & certificats sanitaires",
          detail:
            "Enregistrer analyses (salmonelle, antibiotiques, etc.), joindre rapports, déclencher alertes si dépassement de seuils configurés.",
          outputs: ["Dossier analyses", "Alertes seuils"],
        },
        {
          id: "quality-coldchain",
          title: "Chaîne du froid & conditions",
          detail:
            "Tracer températures de stockage/transport, identifier ruptures, et relier aux non-conformités et retours clients.",
          outputs: ["Historique froid", "Incidents"],
        },
      ],
    },
    {
      id: "health",
      title: "Santé animale & Biosécurité",
      description: "Vaccins, traitements, mortalité et prévention.",
      icon: HeartPulse,
      href: "/admin/health",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-red-50 dark:bg-red-950",
        iconText: "text-red-600 dark:text-red-300",
        badgeBg: "bg-red-600/10 dark:bg-red-400/10",
        badgeText: "text-red-700 dark:text-red-200",
        borderHover: "hover:border-red-500/40",
        toolBorder: "border-red-600/40 dark:border-red-300/40",
      },
      tools: [
        {
          id: "health-vax",
          title: "Plan vaccinal par lot",
          detail:
            "Programmer injections, rappels, lots de vaccins, opérateur, et preuves (document), avec alertes avant échéance.",
          outputs: ["Calendrier", "Historique vaccinal"],
        },
        {
          id: "health-treatments",
          title: "Traitements & registre",
          detail:
            "Tracer médicaments, posologies, périodes d’attente, ordonnances, et contrôles; utile pour audits et conformité.",
          outputs: ["Registre traitements", "Périodes d’attente"],
        },
        {
          id: "health-mortality",
          title: "Mortalité & incidents",
          detail:
            "Saisie quotidienne, causes suspectées, consolidation par lot/bâtiment, et seuils d’alerte configurables.",
          outputs: ["Courbe mortalité", "Alertes seuils"],
        },
        {
          id: "health-biosecurity",
          title: "Plan de biosécurité",
          detail:
            "Checklist (sas, nettoyage, accès), incidents (intrusion, rupture protocole) et actions correctives traçables.",
          outputs: ["Checklists", "Non-conformités bio"],
        },
        {
          id: "health-water-feed",
          title: "Indicateurs eau / alimentation",
          detail:
            "Suivre consommations d’eau et indicateurs alimentaires (IC), avec corrélation production/santé pour diagnostic.",
          outputs: ["KPI eau", "IC", "Corrélations"],
        },
      ],
    },
    {
      id: "environmental",
      title: "Monitoring environnemental",
      description:
        "Ambiance bâtiment (température, humidité, CO2, NH3, lumière).",
      icon: Thermometer,
      href: "/admin/environmental",
      role: "opérateur",
      theme: {
        iconBg: "bg-orange-50 dark:bg-orange-950",
        iconText: "text-orange-600 dark:text-orange-300",
        badgeBg: "bg-orange-600/10 dark:bg-orange-400/10",
        badgeText: "text-orange-700 dark:text-orange-200",
        borderHover: "hover:border-orange-500/40",
        toolBorder: "border-orange-600/40 dark:border-orange-300/40",
      },
      tools: [
        {
          id: "env-sensors",
          title: "Relevés & capteurs",
          detail:
            "Enregistrer ou importer les relevés (température, humidité, CO2, ammoniac), avec horodatage et bâtiment/zone.",
          outputs: ["Séries temporelles", "Export"],
        },
        {
          id: "env-alerts",
          title: "Alertes ambiance",
          detail:
            "Définir des seuils par bâtiment (ex. CO2, NH3), notifier et historiser les déclenchements + acquittements.",
          outputs: ["Alertes", "Historique acquittement"],
        },
        {
          id: "env-light",
          title: "Éclairage (durée/intensité)",
          detail:
            "Suivre les programmes lumineux et leur conformité; relier aux performances (taux de ponte) si besoin.",
          outputs: ["Programmes", "Conformité"],
        },
        {
          id: "env-energy",
          title: "Consommations énergétiques",
          detail:
            "Consolider consommation (chauffage/ventilation), indicateurs par période et coût estimé (pour lien finance).",
          outputs: ["KPI énergie", "Coût estimé"],
        },
      ],
    },
    {
      id: "inventory-supply",
      title: "Stocks & Approvisionnements",
      description: "Référentiel articles, stocks, achats et fournisseurs.",
      icon: Package2,
      href: "/admin/inventory-supply",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-cyan-50 dark:bg-cyan-950",
        iconText: "text-cyan-700 dark:text-cyan-200",
        badgeBg: "bg-cyan-600/10 dark:bg-cyan-400/10",
        badgeText: "text-cyan-800 dark:text-cyan-200",
        borderHover: "hover:border-cyan-500/40",
        toolBorder: "border-cyan-700/35 dark:border-cyan-200/35",
      },
      tools: [
        {
          id: "stock-items",
          title: "Articles & catégories",
          detail:
            "Créer le catalogue (aliments, consommables, pièces), unités, lots/DLUO si nécessaire, et prix de référence.",
          outputs: ["Catalogue", "Unités", "Historique prix"],
        },
        {
          id: "stock-levels",
          title: "Stock & mouvements (FIFO)",
          detail:
            "Entrées/sorties, transferts, inventaires, valorisation; support FIFO pour limiter pertes et péremption.",
          outputs: ["Journal stock", "Valorisation", "Inventaires"],
        },
        {
          id: "stock-suppliers",
          title: "Fournisseurs (référentiel)",
          detail:
            "Gérer fiches fournisseurs (contacts, qualité, conditions), et les relier aux achats/contrats (éviter doublons ailleurs).",
          outputs: ["Fiche fournisseur", "Historique relation"],
        },
        {
          id: "stock-purchasing",
          title: "Achats (commandes → réceptions)",
          detail:
            "Workflow achat : demande, commande, réception, écarts, qualité matière première, et documents (BL/facture).",
          outputs: ["Commandes", "Réceptions", "Écarts"],
        },
        {
          id: "stock-reorder",
          title: "Réappro & alertes",
          detail:
            "Seuils mini, suggestions de commande, alertes, et suivi des ruptures/retards fournisseurs.",
          outputs: ["Alertes", "Suggestions achat"],
        },
      ],
    },
    {
      id: "finance",
      title: "Finance & comptabilité",
      description: "Coûts, revenus, trésorerie et rentabilité.",
      icon: DollarSign,
      href: "/admin/finance",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-emerald-50 dark:bg-emerald-950",
        iconText: "text-emerald-700 dark:text-emerald-200",
        badgeBg: "bg-emerald-600/10 dark:bg-emerald-400/10",
        badgeText: "text-emerald-800 dark:text-emerald-200",
        borderHover: "hover:border-emerald-500/40",
        toolBorder: "border-emerald-700/35 dark:border-emerald-200/35",
      },
      tools: [
        {
          id: "finance-pricing",
          title: "Tarifs & référentiels de prix",
          detail:
            "Gérer prix de vente (par calibre/conditionnement) et coûts d’achat (aliments, consommables) pour calculer marges.",
          outputs: ["Grilles tarifaires", "Historique"],
        },
        {
          id: "finance-entries",
          title: "Dépenses & revenus",
          detail:
            "Saisir/Importer opérations, catégoriser, joindre justificatifs, et relier aux lots/achats si pertinent.",
          outputs: ["Journal", "Catégories", "Pièces"],
        },
        {
          id: "finance-cash",
          title: "Trésorerie",
          detail:
            "Suivi des encaissements/décaissements, échéances et alertes de tension de trésorerie.",
          outputs: ["Prévisionnel", "Échéancier"],
        },
        {
          id: "finance-costing",
          title: "Coût de revient par œuf",
          detail:
            "Calculer un coût de revient (intrants, énergie, maintenance) et le comparer au prix de vente.",
          outputs: ["KPI coût", "Marge estimée"],
        },
        {
          id: "finance-profitability",
          title: "Rentabilité par lot",
          detail:
            "Consolider revenus vs coûts par lot (période), et identifier lots performants / déficitaires.",
          outputs: ["P&L par lot", "Comparatifs"],
        },
      ],
    },
    {
      id: "maintenance",
      title: "Maintenance & équipements",
      description: "Préventif, pannes, pièces et disponibilité.",
      icon: Wrench,
      href: "/admin/maintenance",
      role: "opérateur",
      theme: {
        iconBg: "bg-violet-50 dark:bg-violet-950",
        iconText: "text-violet-700 dark:text-violet-200",
        badgeBg: "bg-violet-600/10 dark:bg-violet-400/10",
        badgeText: "text-violet-800 dark:text-violet-200",
        borderHover: "hover:border-violet-500/40",
        toolBorder: "border-violet-700/35 dark:border-violet-200/35",
      },
      tools: [
        {
          id: "maint-planning",
          title: "Planning préventif",
          detail:
            "Créer des gammes, périodicité, responsables et checklists; suivi de réalisation et retards.",
          outputs: ["Planning", "Taux réalisation"],
        },
        {
          id: "maint-incidents",
          title: "Pannes & interventions",
          detail:
            "Créer des tickets, assigner, tracer temps passé, pièces, cause, et compte-rendu d’intervention.",
          outputs: ["Tickets", "MTTR/MTBF (option)"],
        },
        {
          id: "maint-spares",
          title: "Pièces détachées",
          detail:
            "Suivre consommations de pièces, seuils mini et lien vers Stock (pour éviter double gestion).",
          outputs: ["Consommation pièces", "Alertes"],
        },
        {
          id: "maint-availability",
          title: "Disponibilité équipements",
          detail:
            "Marquer indisponibilité, impacts (bâtiment/production), et historique des indisponibilités.",
          outputs: ["Disponibilité", "Historique"],
        },
        {
          id: "maint-costs",
          title: "Coûts de maintenance",
          detail:
            "Coûts (main d’œuvre, pièces, prestataires), consolidés par équipement, bâtiment et période.",
          outputs: ["Coûts par équipement", "Coûts par site"],
        },
        {
          id: "maint-supplier-contracts",
          title: "Contrats prestataires (liés aux fournisseurs)",
          detail:
            "Référencer des contrats de maintenance (SLA, dates, documents) en s’appuyant sur le référentiel Fournisseurs (module Stock).",
          outputs: ["Contrats", "Échéances"],
        },
      ],
    },
    {
      id: "compliance",
      title: "Conformité réglementaire",
      description: "Registres, audits, certifications et preuves.",
      icon: Scale,
      href: "/admin/compliance",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-rose-50 dark:bg-rose-950",
        iconText: "text-rose-700 dark:text-rose-200",
        badgeBg: "bg-rose-600/10 dark:bg-rose-400/10",
        badgeText: "text-rose-800 dark:text-rose-200",
        borderHover: "hover:border-rose-500/40",
        toolBorder: "border-rose-700/35 dark:border-rose-200/35",
      },
      tools: [
        {
          id: "comp-registry",
          title: "Registre d’élevage numérique",
          detail:
            "Consolider événements obligatoires (lots, traitements, mortalité, analyses) avec export et traçabilité.",
          outputs: ["Registre", "Exports"],
        },
        {
          id: "comp-docs",
          title: "Génération de documents",
          detail:
            "Générer modèles (rapports, attestations), versionner et horodater les documents produits.",
          outputs: ["Documents", "Versions"],
        },
        {
          id: "comp-audits",
          title: "Audits & contrôles officiels",
          detail:
            "Planifier audits internes, saisir constats, actions correctives et preuves de clôture.",
          outputs: ["Plans d’audit", "Actions"],
        },
        {
          id: "comp-alerts",
          title: "Alertes réglementaires",
          detail:
            "Alertes sur échéances (contrôles, documents, certifications) et suivi d’acquittement.",
          outputs: ["Alertes", "Échéances"],
        },
      ],
    },
    {
      id: "reports",
      title: "Rapports & analyses",
      description: "KPIs transverses, exports, comparatifs et tendances.",
      icon: BarChart3,
      href: "/admin/reports",
      role: "visiteur",
      theme: {
        iconBg: "bg-indigo-50 dark:bg-indigo-950",
        iconText: "text-indigo-700 dark:text-indigo-200",
        badgeBg: "bg-indigo-600/10 dark:bg-indigo-400/10",
        badgeText: "text-indigo-800 dark:text-indigo-200",
        borderHover: "hover:border-indigo-500/40",
        toolBorder: "border-indigo-700/35 dark:border-indigo-200/35",
      },
      tools: [
        {
          id: "rep-kpis",
          title: "KPIs clés (multi-modules)",
          detail:
            "Production, qualité, santé, ambiance, stock, finance : une vue cohérente avec filtres (période, lot, bâtiment).",
          outputs: ["Tableaux de bord", "Filtres"],
        },
        {
          id: "rep-comparative",
          title: "Analyses comparatives",
          detail:
            "Comparer lots/bâtiments, périodes, et indicateurs (ex. production vs CO2) pour identifier des leviers.",
          outputs: ["Comparatifs", "Corrélations (option)"],
        },
        {
          id: "rep-exports",
          title: "Exports (CSV/Excel)",
          detail:
            "Exports paramétrables pour comptabilité, audit, ou analyses externes (BI), avec historique d’exports.",
          outputs: ["Exports", "Historique"],
        },
        {
          id: "rep-seasonality",
          title: "Tendances & saisonnalité",
          detail:
            "Mettre en évidence tendances et périodes atypiques; utile pour planifier et anticiper.",
          outputs: ["Tendances", "Alertes d’écart (option)"],
        },
      ],
    },
    {
      id: "workers",
      title: "Gestion des utilisateurs",
      description: "Comptes, rôles, permissions et traçabilité.",
      icon: Users,
      href: "/admin/workers",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-pink-50 dark:bg-pink-950",
        iconText: "text-pink-700 dark:text-pink-200",
        badgeBg: "bg-pink-600/10 dark:bg-pink-400/10",
        badgeText: "text-pink-800 dark:text-pink-200",
        borderHover: "hover:border-pink-500/40",
        toolBorder: "border-pink-700/35 dark:border-pink-200/35",
      },
      tools: [
        {
          id: "users-accounts",
          title: "Comptes & profils",
          detail:
            "Créer comptes, gérer profils (nom, équipe, contact), statut actif/inactif et règles de sécurité.",
          outputs: ["Annuaire", "Historique"],
        },
        {
          id: "users-roles",
          title: "Rôles & permissions",
          detail:
            "Attribuer rôles (gestionnaire/opérateur/visiteur) et permissions fines par module (lecture/écriture/export).",
          outputs: ["Matrice accès", "Rôles"],
        },
        {
          id: "users-audit",
          title: "Historique d’activité",
          detail:
            "Journaliser actions sensibles (suppression, validation, exports) pour audit et responsabilité.",
          outputs: ["Audit log"],
        },
        {
          id: "users-notifs",
          title: "Notifications",
          detail:
            "Paramétrer qui reçoit quoi (alertes, échéances) selon rôle et périmètre (bâtiment/lot).",
          outputs: ["Préférences", "Routage"],
        },
      ],
    },
    {
      id: "settings",
      title: "Paramètres & configuration",
      description: "Paramètres système, unités, intégrations et sauvegardes.",
      icon: Settings,
      href: "/admin/settings",
      role: "gestionnaire",
      theme: {
        iconBg: "bg-slate-50 dark:bg-slate-950",
        iconText: "text-slate-700 dark:text-slate-200",
        badgeBg: "bg-slate-600/10 dark:bg-slate-400/10",
        badgeText: "text-slate-800 dark:text-slate-200",
        borderHover: "hover:border-slate-500/40",
        toolBorder: "border-slate-700/25 dark:border-slate-200/25",
      },
      tools: [
        {
          id: "settings-general",
          title: "Configuration générale",
          detail:
            "Infos exploitation, fuseau, formats, règles de nommage, et paramètres de base des modules.",
          outputs: ["Paramètres", "Historique"],
        },
        {
          id: "settings-units",
          title: "Unités & référentiels",
          detail:
            "Unités (kg, L, kWh), catégories, listes contrôlées, et harmonisation des saisies.",
          outputs: ["Référentiels"],
        },
        {
          id: "settings-integrations",
          title: "Intégrations",
          detail:
            "Connecteurs (capteurs, exports, API), clés, webhooks, et diagnostics de synchronisation.",
          outputs: ["État sync", "Logs"],
        },
        {
          id: "settings-backups",
          title: "Sauvegarde & restauration",
          detail:
            "Stratégie de sauvegarde, exécutions, rétention, et procédure de restauration testée.",
          outputs: ["Backups", "Rapports"],
        },
        {
          id: "settings-ui",
          title: "Préférences d’affichage",
          detail:
            "Options d’interface (thème, langue, densité d’affichage) et réglages de confort opérateur.",
          outputs: ["Préférences UI"],
        },
      ],
    },
  ] as const satisfies readonly Module[];

  const totalTools = modules.reduce(
    (total, module) => total + module.tools.length,
    0
  );
  const maxToolsPerModule = Math.max(...modules.map((m) => m.tools.length));

  return (
    <div className="container mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Tableau de bord Admin
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Gérez tous les aspects de votre exploitation avicole.
            </p>
          </div>

          <div className="shrink-0 text-left md:text-right">
            <Badge variant="outline" className="mb-1 text-sm font-normal">
              {totalTools} outils disponibles
            </Badge>
            <p className="text-xs text-muted-foreground">
              {modules.length} modules fonctionnels
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <div className="h-px grow bg-border" />
          <span className="text-sm text-muted-foreground">
            Système de gestion avicole intégré
          </span>
          <div className="h-px grow bg-border" />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link
              key={module.id}
              href={module.href}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`${module.title} - ouvrir`}
            >
              <Card
                className={[
                  "flex h-full flex-col border-2 transition-all duration-300",
                  "hover:shadow-xl hover:scale-[1.02]",
                  "cursor-pointer",
                  module.theme.borderHover,
                ].join(" ")}
              >
                <CardHeader className="space-y-4 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110",
                        module.theme.iconBg,
                      ].join(" ")}
                    >
                      <Icon
                        className={["h-6 w-6", module.theme.iconText].join(" ")}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={roleVariant(module.role)}
                        className="h-6 px-2 text-xs font-medium"
                        title="Rôle minimal recommandé"
                      >
                        {roleLabel(module.role)}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className={[
                          "h-6 border-0 px-2 text-xs font-semibold",
                          module.theme.badgeBg,
                          module.theme.badgeText,
                        ].join(" ")}
                        title="Nombre d’outils dans le module"
                      >
                        {module.tools.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-xl transition-colors group-hover:text-primary">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                {/* Tools list */}
                <CardContent className="grow pt-0">
                  <div className="space-y-3">
                    <h4 className="flex items-center text-sm font-medium text-muted-foreground">
                      <span className="mr-2">Outils disponibles</span>
                      <span className="h-px grow bg-border" />
                    </h4>

                    <div className="custom-scrollbar max-h-72 space-y-2 overflow-y-auto pr-2">
                      {module.tools.map((tool) => (
                        <div
                          key={tool.id}
                          className={[
                            "rounded-md border-l-2 p-2 transition-colors",
                            "bg-background hover:bg-accent/30",
                            module.theme.toolBorder,
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-medium text-foreground">
                              {tool.title}
                            </p>
                            {tool.outputs?.length ? (
                              <Badge
                                variant="outline"
                                className="h-5 px-2 text-[10px] font-normal"
                              >
                                {tool.outputs.length} livrables
                              </Badge>
                            ) : null}
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {tool.detail}
                          </p>

                          {tool.outputs?.length ? (
                            <ul className="mt-2 flex flex-wrap gap-1.5">
                              {tool.outputs.map((o) => (
                                <li key={o}>
                                  <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                                    {o}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Stats Footer */}
      <div className="border-t pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{modules.length}</div>
              <p className="text-sm text-muted-foreground">
                Modules fonctionnels
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{totalTools}</div>
              <p className="text-sm text-muted-foreground">
                Outils disponibles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{maxToolsPerModule}</div>
              <p className="text-sm text-muted-foreground">
                Outils maximum par module
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
