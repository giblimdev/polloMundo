//@/app/public/alimentationData.ts

/* Données sur les types d'alimentation pour poules pondeuses */
export const alimentation = [
  {
    id: 1,
    nom: "Aliment de démarrage",
    type_commercial: "Starter",
    periode_debut_semaines: 0,
    periode_fin_semaines: 6,
    objectif:
      "Développer la santé digestive, soutenir une croissance robuste et le développement squelettique",
    caracteristiques: {
      proteines_pourcentage: "18-20%",
      energie: "Élevée (2900-2950 kcal/kg)",
      calcium_pourcentage: "~1%",
      phosphore_disponible: "0.45-0.50%",
      granulometrie: "Fine (miettes ou petits granulés)",
      acides_amines_cles: "Lysine, méthionine pour démarrage",
      vitamines_mineraux: "Enrichi pour système immunitaire et croissance",
    },
    conseils_pratiques: [
      "Aliment distribué à volonté (ad libitum)",
      "Transition depuis l'aliment poussin sur 3-4 jours si nécessaire",
      "Vérifier la consommation et le poids cible hebdomadaire",
    ],
  },
  {
    id: 2,
    nom: "Aliment de croissance",
    type_commercial: "Grower",
    periode_debut_semaines: 6,
    periode_fin_semaines: 16,
    objectif:
      "Poursuivre la croissance squelettique et musculaire de manière contrôlée, préparer la maturité sexuelle sans engraissement excessif",
    caracteristiques: {
      proteines_pourcentage: "15-17%",
      energie: "Légèrement inférieure au starter (2750-2850 kcal/kg)",
      calcium_pourcentage: "~1%",
      phosphore_disponible: "0.40-0.45%",
      granulometrie: "Granulés",
      acides_amines_cles: "Lysine, méthionine ajustés",
      vitamines_mineraux: "Équilibre maintenu pour le développement",
      fibres: "5-6% pour développement du système digestif",
    },
    conseils_pratiques: [
      "Contrôle strict du poids corporel selon courbe de la souche",
      "Peut être distribué en ration limitée pour éviter l'embonpoint",
      "Adapter selon les conditions environnementales",
    ],
  },
  {
    id: 3,
    nom: "Aliment de pré-ponte / transition",
    type_commercial: "Pré-Ponte / Developer",
    periode_debut_semaines: 16,
    periode_fin_semaines: 18,
    objectif:
      "Transition nutritionnelle cruciale. Préparer l'organisme à la ponte en constituant les réserves de calcium médullaire dans les os et en adaptant le système digestif",
    caracteristiques: {
      proteines_pourcentage: "16-17%",
      energie: "En augmentation progressive (2750-2800 kcal/kg)",
      calcium_pourcentage: "2.5-3.5% (augmentation progressive)",
      phosphore_disponible: "0.45-0.50%",
      granulometrie: "Granulés",
      acides_amines_cles: "Augmentation progressive des niveaux",
      vitamines_mineraux: "Niveaux élevés, notamment vitamine D3 et phosphore",
    },
    conseils_pratiques: [
      "Transition impérative sur 7-10 jours avec le grower",
      "Ne pas retarder l'introduction : débuter vers 16 semaines ou à 5% de ponte",
      "Suivre attentivement la consommation",
    ],
  },
  {
    id: 4,
    nom: "Aliment de ponte",
    type_commercial: "Layer feed",
    periode_debut_semaines: 18,
    periode_fin_semaines: 45,
    objectif:
      "Soutenir une production d'œufs optimale en quantité et qualité (coquille, jaune), maintenir l'état corporel et la santé de la poule",
    caracteristiques: {
      proteines_pourcentage: "16-18%",
      energie: "Adaptée (2700-2850 kcal/kg)",
      calcium_pourcentage: "3.5-4.2%",
      phosphore_disponible: "0.40-0.45% (rapport Ca/P ≈ 8-10:1)",
      granulometrie: "Granulés, miettes ou farine",
      acides_amines_cles: "Lysine (~0.85%), Méthionine (~0.40%)",
      vitamines_mineraux:
        "Équilibre complet pour la ponte (vit A, D3, E, B, oligo-éléments)",
      source_calcium:
        "Mélange de particules fines (assimilation rapide) et grossières (coquillages, calcaire grossier 1,5-3,5mm pour libération lente - 70-85% du calcium)",
    },
    conseils_pratiques: [
      "Distribution ad libitum",
      "Adapter la formulation selon la température (plus d'énergie en hiver)",
      "Éviter les transitions brusques",
      "Surveiller régulièrement la qualité des coquilles",
    ],
  },
  {
    id: 5,
    nom: "Aliment de fin de cycle / maintien",
    type_commercial: "Phase 2 / Fin de Ponte",
    periode_debut_semaines: 45,
    periode_fin_semaines: 80,
    objectif:
      "Adapter la nutrition après le pic de ponte, lorsque le taux de ponte décline et que les besoins en protéines et en énergie diminuent légèrement, tout en maintenant une excellente qualité de coquille",
    caracteristiques: {
      proteines_pourcentage: "15-16%",
      energie: "Légèrement réduite si nécessaire (2650-2750 kcal/kg)",
      calcium_pourcentage: "4.0-4.5%",
      phosphore_disponible: "0.35-0.40%",
      granulometrie: "Similaire à l'aliment de ponte",
      acides_amines_cles:
        "Lysine (~0.75-0.80%), Méthionine ajustés à la baisse",
      vitamines_mineraux: "Maintenus, attention renforcée à la vitamine D3",
    },
    conseils_pratiques: [
      "Optionnel, selon la stratégie d'élevage et la longévité du troupeau",
      "Transition progressive si mise en place (7-10 jours)",
      "Surveillance accrue de la qualité des coquilles (fragilité accrue avec l'âge)",
      "Contrôler le poids pour éviter l'embonpoint en fin de cycle",
    ],
  },
];

/* Type pour TypeScript */
export type AlimentationType = {
  id: number;
  nom: string;
  type_commercial: string;
  periode_debut_semaines: number;
  periode_fin_semaines: number;
  objectif: string;
  caracteristiques: {
    proteines_pourcentage: string;
    energie: string;
    calcium_pourcentage: string;
    phosphore_disponible: string;
    granulometrie: string;
    acides_amines_cles: string;
    vitamines_mineraux: string;
    source_calcium?: string;
    fibres?: string;
  };
  conseils_pratiques: string[];
};
