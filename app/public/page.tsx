// src/components/navigation/PublicNav.tsx
import React from "react";
import Link from "next/link";
import {
  Egg,
  Home,
  Warehouse,
  ShoppingBag,
  Scale,
  FileText,
  HelpCircle,
  BookOpen,
  ClipboardList,
  Wrench,
  UtensilsCrossed,
  Building2,
  Factory,
  Mail,
} from "lucide-react";

// --------------------
// Types
// --------------------
interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: any;
}

interface NavCategory {
  title: string;
  emoji?: string;
  description: string;
  colorBack: string;
  items: NavItem[];
}

// --------------------
// Données : PolloMundo – Guide des Catégories
// --------------------
export const PUBLIC_PAGES: NavCategory[] = [
  {
    title: "Élevage",
    emoji: "🐔",
    colorBack: "bg-yellow-50",
    description:
      "L’élevage des poules pondeuses est au cœur de la production chez PolloMundo. Cette section vous accompagne à chaque étape : du cycle de vie des poules aux actions clés pour garantir leur santé et leur productivité.",
    items: [
      {
        title: "Guide d’élevage",
        href: "/public/guide-elevage",
        description:
          "Cycle de vie, étapes essentielles et actions clés pour la productivité.",
        icon: BookOpen,
      },
      {
        title: "Conduite en lots",
        href: "/public/conduite-lots",
        description:
          "Gestion des bandes, vide sanitaire et continuité de production.",
        icon: ClipboardList,
      },
      {
        title: "Qualité de l’élevage",
        href: "/public/qualite-elevage",
        description:
          "Quarantaine, traçabilité, documents et calendrier des lots.",
        icon: FileText,
      },
      {
        title: "Alimentation",
        href: "/public/alimentation",
        description:
          "Phases alimentaires, gestion de l’eau, stockage et distribution.",
        icon: Egg,
      },
      {
        title: "Indicateurs de performance (KPI)",
        href: "/public/kpi-elevage",
        description: "Suivi des performances et ratios d’élevage.",
        icon: Scale,
      },
    ],
  },
  {
    title: "Infrastructures",
    emoji: "🏠",
    colorBack: "bg-blue-50",
    description:
      "Les infrastructures sont la base d’un élevage performant : bâtiments, réseaux, électricité et équipements essentiels pour le confort et la sécurité.",
    items: [
      {
        title: "Bâtiments & installations",
        href: "/public/installations",
        description:
          "Pièces, usages, paramètres environnementaux et réseaux (eau, électricité, énergie).",
        icon: Building2,
      },
      {
        title: "Aménagement & densité",
        href: "/public/amenagements",
        description:
          "Gestion des espaces, enrichissements, perchoirs et nids de ponte.",
        icon: Factory,
      },
      {
        title: "Matériel & équipements",
        href: "/public/materiel",
        description:
          "Nids, perchoirs, abreuvoirs, mangeoires, références et entretien.",
        icon: Wrench,
      },
      {
        title: "Maintenance & sécurité",
        href: "/public/maintenance",
        description: "Protocoles d’entretien et de prévention des risques.",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Production",
    emoji: "🥚",
    colorBack: "bg-amber-50",
    description:
      "Tout savoir sur les œufs : catégories, collecte, conditionnement, conservation et valorisation des sous-produits.",
    items: [
      {
        title: "Catégories d’œufs",
        href: "/public/categories-oeufs",
        description:
          "Normes de classification (A/B), calibre, poids et critères de tri.",
        icon: Egg,
      },
      {
        title: "Collecte & tri",
        href: "/public/collecte-tri",
        description:
          "Méthodes de collecte, classification et rendements par catégorie.",
        icon: ClipboardList,
      },
      {
        title: "Conditionnement & conservation",
        href: "/public/conditionnement",
        description:
          "Traçabilité, emballages, hygiène et durée de conservation.",
        icon: Warehouse,
      },
      {
        title: "Valorisation des sous-produits",
        href: "/public/valorisation",
        description:
          "Engrais, compost, vente des poules de réforme et autres usages.",
        icon: UtensilsCrossed,
      },
      {
        title: "Qualité & traçabilité",
        href: "/public/qualite-production",
        description: "Procédures HACCP, registres et contrôles qualité.",
        icon: Scale,
      },
    ],
  },
  {
    title: "Vente",
    emoji: "💰",
    colorBack: "bg-green-50",
    description:
      "La vente et la valorisation des produits avicoles sont essentielles à la rentabilité. Stratégies marketing, canaux de distribution, tarification et recettes inclus.",
    items: [
      {
        title: "Vente & marketing",
        href: "/public/vente-marketing",
        description:
          "Canaux de vente, stratégie, communication et planification.",
        icon: ShoppingBag,
      },
      {
        title: "Politique tarifaire",
        href: "/public/tarification",
        description: "Méthodes de fixation des prix et marges.",
        icon: Scale,
      },
      {
        title: "Recettes",
        href: "/public/recettes",
        description:
          "Idées pour valoriser les produits et réduire le gaspillage.",
        icon: UtensilsCrossed,
      },
    ],
  },
  {
    title: "Réglementation",
    emoji: "📜",
    colorBack: "bg-red-50",
    description:
      "Respecter les normes est indispensable pour garantir qualité et sécurité. Retrouvez ici les règles, obligations et modèles de documents utiles.",
    items: [
      {
        title: "Normes & obligations",
        href: "/public/reglementation",
        description:
          "Biosécurité, hygiène, bien-être animal et obligations légales.",
        icon: Scale,
      },
      {
        title: "Documents & registres",
        href: "/public/documents-registres",
        description:
          "Registres d’élevage, sanitaire et de production, fiches de poste, modèles.",
        icon: FileText,
      },
      {
        title: "Conformité & contrôles",
        href: "/public/conformite",
        description: "Inspections, audits, assurances et gestion de crise.",
        icon: ClipboardList,
      },
      {
        title: "Base documentaire",
        href: "/user/base-documentaire",
        description: "Ressources et modèles (connexion requise).",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "Aide",
    emoji: "💡",
    colorBack: "bg-indigo-50",
    description:
      "Besoin d’assistance ? Retrouvez les guides d’utilisation, la FAQ et les moyens de contacter le support technique PolloMundo.",
    items: [
      {
        title: "Aide application",
        href: "/public/aide",
        description: "Tutoriels, guides et dépannage utilisateur.",
        icon: HelpCircle,
      },
      {
        title: "FAQ",
        href: "/public/faq",
        description: "Questions fréquentes et solutions rapides.",
        icon: ClipboardList,
      },
      {
        title: "Contact",
        href: "/public/contact",
        description: "Contacter le support technique PolloMundo.",
        icon: Mail,
      },
    ],
  },
];

// --------------------
// Composant principal
// --------------------
export const PublicNav: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        PolloMundo – Guide des Catégories
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PUBLIC_PAGES.map((category) => (
          <div
            key={category.title}
            className={`rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all ${category.colorBack}`}
          >
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>{category.emoji}</span>
                {category.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>

              <div className="space-y-3 mt-auto">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-start gap-3 group hover:bg-white/40 p-2 rounded-lg transition"
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 mt-1" />
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-700">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicNav;
