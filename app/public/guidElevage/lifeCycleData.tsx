//@/app/public/lifeCycleData.tsx
/* Simule le résultat d'une requête à la DB */

export const lifeCycleData = [
  {
    order: 1,
    title: "Démarrage",
    semaine: "(0–4 semaines)",
    jour: "0-28 jours",
    poidsCible: "75 g → 257 g à 4 semaines",
    alimentationType: "Démarrage 19-20% protéines",
    alimentation: "10-30 g/jour/poussin (progression graduelle)",
    eau: "Consommation : 40–80 ml/jour/poussin (ratio 2:1 eau/aliment)",
    temperature: "35-36 °C → 22-24 °C (réduction de 2-3°C par semaine)",
    luminosite: "22-23 h/jour (intensité 30-40 lux)",
    tauxPonte: "0 %",
    hygrometrie: "60-70%",
    soins: {
      vaccins: [
        "Jour 1 : Marek (IM ou SC)",
        "Jour 1 : Gumboro (selon protocole)",
        "Jour 7 : Bronchite Infectieuse (spray ou eau de boisson)",
        "Jour 14 : Maladie de Newcastle (NCD, eau de boisson)",
      ],
      vermifuge: "Aucun — trop jeune, non recommandé",
      antiparasitaire: "Aucun — biosécurité renforcée (désinfection préalable)",
    },
    sources: ["lohmann-breeders.com", "livestocking.com", "ufarevue.ch"],
  },
  {
    order: 2,
    title: "Croissance",
    semaine: "(5–10 semaines)",
    jour: "29-70 jours",
    poidsCible: "338 g → 814 g à 10 semaines",
    alimentationType: "Croissance 17-18% protéines",
    alimentation: "30-50 g/jour (consommation croissante)",
    eau: "Consommation : 100–150 ml/jour/poule (ratio 2:1 eau/aliment)",
    temperature: "24-26 °C décroissant → 20 °C",
    luminosite: "16-18 h/jour (intensité 10-15 lux)",
    tauxPonte: "0 %",
    hygrometrie: "60-70%",
    soins: {
      vaccins: [
        "Semaine 5 : Rappel Gumboro + Newcastle (eau de boisson)",
        "Semaine 7 : Pox (variole aviaire, aile)",
      ],
      vermifuge: "Semaine 11 : Flubendazole ou Fenbendazole (5 jours)",
      antiparasitaire: "Poudre insecticide litière (perméthrine ou équivalent)",
    },
    sources: ["lohmann-breeders.com", "livestocking.com", "aivt.fr"],
  },
  {
    order: 3,
    title: "Pré-ponte",
    semaine: "(11–17 semaines)",
    jour: "71-119 jours",
    poidsCible: "901 g → 1 268 g à 17 semaines",
    alimentationType: "Développement puis Pré-ponte 15-16% protéines",
    alimentation: "60-80 g/jour (phase développement avec 5-6% fibres)",
    eau: "Consommation : 150–200 ml/jour/poule (eau propre, sans fer ni chlore excessif)",
    temperature: "18-22 °C (zone de thermoneutralité)",
    luminosite: "8-10 h/jour (réduction progressive pour stimulation future)",
    tauxPonte: "0 %",
    hygrometrie: "60-70%",
    soins: {
      vaccins: [
        "Semaine 12 : Coryza ou Choléra aviaire (selon zone)",
        "Semaine 14 : Rappel Newcastle + Bronchite Infectieuse",
        "Semaine 16 : Vaccin Mycoplasma gallisepticum (MG, si requis)",
      ],
      vermifuge: "Semaine 14 : Levamisole ou Flubendazole (5 jours)",
      antiparasitaire: "Contrôle visuel des plumes et nettoyage des perchoirs",
    },
    sources: ["lohmann-breeders.com", "ufarevue.ch", "meadersfeeds.com"],
  },
  {
    order: 4,
    title: "Mise en ponte",
    semaine: "(18–20 semaines)",
    jour: "120-140 jours",
    poidsCible: "1 320 g → 1 371 g",
    alimentationType: "Transition puis Pondeuse 16-17% protéines",
    alimentation:
      "90-100 g/jour (transition progressive vers ration ponte, calcium 2-2,5% puis 3,5-4%)",
    eau: "200–250 ml/jour/poule (contrôler les fuites et la température de l’eau)",
    temperature: "18-22 °C",
    luminosite:
      "12-14 h/jour (augmentation progressive de 30 min à 1h/semaine)",
    tauxPonte: "5-10% (amorçage)",
    hygrometrie: "60-70%",
    repartitionOeufs: { S: 70, M: 25, L: 5, XL: 0 },
    poidsMoyenOeuf: "45-50 g",
    soins: {
      vaccins: ["Semaine 20 : Rappel Newcastle + Bronchite (en ponte)"],
      vermifuge: "Tous les 3 mois — Flubendazole ou Piperazine (5 jours)",
      antiparasitaire:
        "Application poudre insecticide / spray coop chaque 4-6 sem.",
    },
    sources: ["lohmann-breeders.com", "virbac.com", "lepointveterinaire.fr"],
  },
  {
    order: 5,
    title: "Montée de ponte",
    semaine: "(21–30 semaines)",
    jour: "141-210 jours",
    poidsCible: "1 450 g → 1 550 g (stabilisation)",
    alimentationType: "Pondeuse Phase 1 - 16-18% protéines, 3,5-4% calcium",
    alimentation:
      "115-125 g/jour (augmentation de 5g/semaine pour atteindre le pic)",
    eau: "250–280 ml/jour/poule (ratio 2:1, nettoyage abreuvoirs quotidien)",
    temperature: "18-22 °C (idéal 20°C)",
    luminosite: "14-15 h/jour (intensité 10-15 lux)",
    tauxPonte: "10% → 85-90% (progression rapide)",
    hygrometrie: "60-65%",
    repartitionOeufs: { S: 20, M: 55, L: 25, XL: 0 },
    poidsMoyenOeuf: "55-58 g",
    soins: {
      vaccins: ["Semaine 24-26 : Rappel Coryza / Choléra aviaire"],
      vermifuge:
        "Tous les 3 mois — alterner les molécules (rotation antiparasitaire)",
      antiparasitaire:
        "Nettoyage complet du bâtiment, contrôle des acariens rouges",
      autres: [
        "Nettoyage abreuvoirs chaque jour",
        "Désinfection mensuelle générale",
      ],
    },
    sources: ["lohmann-breeders.com", "reussir.fr", "europe.sassopoultry.com"],
  },
  {
    order: 6,
    title: "Pic de ponte",
    semaine: "(31–45 semaines)",
    jour: "211-315 jours",
    poidsCible: "1 550-1 650 g (stabilisé)",
    alimentationType: "Pondeuse Phase 1 - 16-18% protéines, 3,9-4% calcium",
    alimentation: "125-130 g/jour (maximum, ajustement selon température)",
    eau: "250–300 ml/jour/poule (hausse en climat chaud, eau < 20°C)",
    temperature: "18-22 °C (au-delà de 25°C baisse de consommation)",
    luminosite: "14-16 h/jour stable",
    tauxPonte: "90-95% (pic à 32-36 semaines, 6-7 œufs/semaine)",
    hygrometrie: "60-65%",
    repartitionOeufs: { S: 5, M: 45, L: 45, XL: 5 },
    poidsMoyenOeuf: "60-62 g",
    soins: {
      vaccins: [
        "Semaine 40 : Rappel Newcastle + Bronchite (renforcement immunité)",
      ],
      vermifuge: "Tous les 3 mois — Flubendazole",
      antiparasitaire: "Pulvérisation insecticide bâtiments et perchoirs",
    },
    sources: ["lohmann-breeders.com", "hato.lighting", "reussir.fr"],
  },
  {
    order: 7,
    title: "Plateau de ponte",
    semaine: "(46–60 semaines)",
    jour: "316-420 jours",
    poidsCible: "1 650-1 750 g",
    alimentationType: "Pondeuse Phase 2 - 16-17% protéines, 4-4,2% calcium",
    alimentation: "120-125 g/jour (stabilisation)",
    eau: "250–300 ml/jour/poule (ratio 2:1, vérifier les débits des pipettes)",
    temperature: "18-22 °C",
    luminosite: "14-16 h/jour",
    tauxPonte: "85-88% (maintien élevé)",
    hygrometrie: "60-65%",
    repartitionOeufs: { S: 0, M: 35, L: 50, XL: 15 },
    poidsMoyenOeuf: "63-65 g",
    soins: {
      vaccins: ["Semaine 55 : Rappel global Newcastle + Bronchite"],
      vermifuge: "Tous les 3 mois",
      antiparasitaire:
        "Traitement anti-acariens (terre de diatomée ou spray biologique)",
    },
    sources: ["lohmann-breeders.com", "chambres-agriculture.fr"],
  },
  {
    order: 8,
    title: "Fin de cycle",
    semaine: "(61–78 semaines)",
    jour: "421-540 jours",
    poidsCible: "1 750-1 970 g (stabilisé)",
    alimentationType: "Pondeuse Phase 3 - 15-16% protéines, 4,3-4,5% calcium",
    alimentation: "115-120 g/jour (réduction pour limiter prise de poids)",
    eau: "220–260 ml/jour/poule (réduction naturelle avec baisse de consommation)",
    temperature: "18-22 °C",
    luminosite: "14-16 h/jour",
    tauxPonte: "75-85% (déclin progressif de 1-2%/mois, 70-80% à 80 semaines)",
    hygrometrie: "60-65%",
    objectifProduction: "290-300 œufs à 72 sem | 310-320 œufs à 80 sem",
    repartitionOeufs: { S: 0, M: 25, L: 55, XL: 20 },
    poidsMoyenOeuf: "65-67 g",
    soins: {
      vaccins: ["Avant réforme : aucun rappel supplémentaire"],
      vermifuge: "Dernier traitement 2 semaines avant réforme",
      antiparasitaire: "Nettoyage final bâtiment avant vide sanitaire",
      autres: ["Plan de vide sanitaire 3 semaines, désinfection totale"],
    },
    sources: [
      "lohmann-breeders.com",
      "chambres-agriculture.fr",
      "produire-bio.fr",
    ],
  },
];

/* Type pour TypeScript */
export type LifeCyclePhase = {
  order: number;
  title: string;
  semaine: string;
  jour: string;
  poidsCible: string;
  alimentationType: string;
  alimentation: string;
  eau: string;
  temperature: string;
  luminosite: string;
  hygrometrie: string;
  tauxPonte: string;
  objectifProduction?: string;
  repartitionOeufs?: { S: number; M: number; L: number; XL: number };
  poidsMoyenOeuf?: string;
  soins?: {
    vaccins?: string[];
    vermifuge?: string;
    antiparasitaire?: string;
    autres?: string[];
  };
  sources: string[];
};
