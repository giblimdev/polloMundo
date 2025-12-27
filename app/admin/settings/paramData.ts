// @/app/admin/paramData.ts
// -----------------------------------------------------------------------------
// Paramètres administratifs globaux pour l'application PolloMondo
// Gestion des élevages de poules pondeuses et de poulets de chair
// -----------------------------------------------------------------------------
// Ce fichier contient exclusivement des constantes et des définitions de types.
// Toutes les valeurs sont réalistes et exprimées selon les unités courantes :
//  - "par tête"  = par oiseau individuel
//  - "par cycle" = par période complète d’élevage (ex. 18 mois pour les pondeuses)
//  - "par période" = jour, mois, année selon la donnée
// -----------------------------------------------------------------------------
//
// Les commentaires décrivent :
//  - la signification de chaque paramètre
//  - l’unité et la traduction éventuelle
//  - le contexte d’utilisation dans la gestion économique
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// TYPES GÉNÉRIQUES
// -----------------------------------------------------------------------------

export type Currency = "EUR" | "USD" | "COP";
export type MassUnit = "kg" | "t";
export type PriceBasis = "perEgg" | "perDozen" | "perKgLive" | "perBird";
export type TimeUnit = "day" | "week" | "month" | "year" | "cycle";
export type EggSize = "S" | "M" | "L" | "XL";

export type ParamNumber = {
  value: number;
  unit?: string; // Unité descriptive (ex: "COP/œuf", "kg/poule/cycle")
  note?: string; // Explication en français contextualisée
  min?: number;
  max?: number;
  step?: number;
};

export type EggSizeSpec = {
  size: EggSize;
  minWeightG?: number;
  maxWeightG?: number;
};

export type LayerParams = {
  eggSale: {
    basis: PriceBasis;
    priceBySize: Record<EggSize, ParamNumber>;
    downgradedEggShare: ParamNumber;
  };
  spentHenSale: {
    basis: "perBird";
    pricePerBird: ParamNumber;
  };
  birdPurchase: {
    dayOldChick: ParamNumber;
    oneWeekChick: ParamNumber;
    pullet15to18Weeks: ParamNumber;
    layingHen: ParamNumber;
  };
  feed: {
    starterCostPerKg: ParamNumber;
    growerCostPerKg: ParamNumber;
    finisherCostPerKg: ParamNumber;
    targetFeedIntakeKgPerHen: {
      starter: ParamNumber;
      grower: ParamNumber;
      finisher: ParamNumber;
      layer: ParamNumber;
    };
  };
  operatingCosts: {
    vetCostPerHenCycle: ParamNumber;
    laborCostPerHour: ParamNumber;
    laborHoursPerHenCycle: ParamNumber;
    utilitiesCostPerHenCycle: ParamNumber;
    equipmentCostPerHenCycle: ParamNumber;
    otherCostPerHenCycle: ParamNumber;
  };
  performance: {
    mortalityRate: ParamNumber;
    layingRate: ParamNumber;
    cycleDurationDays: ParamNumber;
    eggsPerHenPerCycle: ParamNumber;
  };
};

export type BroilerParams = {
  sale: {
    basis: "perKgLive" | "perBird";
    pricePerKgLive: ParamNumber;
    pricePerBird: ParamNumber;
    averageSaleWeightKg: ParamNumber;
  };
  birdPurchase: {
    broilerChick: ParamNumber;
  };
  feed: {
    starterCostPerKg: ParamNumber;
    growerCostPerKg: ParamNumber;
    finisherCostPerKg: ParamNumber;
    targetFCR: ParamNumber;
  };
  operatingCosts: {
    vetCostPerBirdCycle: ParamNumber;
    laborCostPerHour: ParamNumber;
    laborHoursPerBirdCycle: ParamNumber;
    utilitiesCostPerBirdCycle: ParamNumber;
    equipmentCostPerBirdCycle: ParamNumber;
    otherCostPerBirdCycle: ParamNumber;
  };
  performance: {
    mortalityRate: ParamNumber;
    cycleDurationDays: ParamNumber;
    averageFinalWeightKg: ParamNumber;
    averageInitialWeightKg: ParamNumber;
    averageDailyGainKg: ParamNumber;
  };
};

export type PolloMondoParams = {
  meta: {
    currency: Currency;
    locale: string;
    lastUpdatedISO: string;
  };
  standards: {
    eggSizesEU: EggSizeSpec[];
  };
  layers: LayerParams;
  broilers: BroilerParams;
};

export const ADMIN_PARAMS: PolloMondoParams = {
  meta: {
    currency: "COP", // Devise locale principale pour Colombie
    locale: "es-CO", // Paramètre régional (espagnol Colombie)
    lastUpdatedISO: new Date().toISOString(),
  },

  standards: {
    eggSizesEU: [
      { size: "S", maxWeightG: 53 },
      { size: "M", minWeightG: 53, maxWeightG: 63 },
      { size: "L", minWeightG: 63, maxWeightG: 73 },
      { size: "XL", minWeightG: 73 },
    ],
  },

  // -------------------------------------------------------------------------
  // POULLES PONDEUSES (LAYER) – marché Colombie
  // -------------------------------------------------------------------------
  layers: {
    // Vente d’œufs par taille
    eggSale: {
      basis: "perEgg", // Prix par œuf unitaire
      priceBySize: {
        S: {
          value: 650,
          unit: "COP/œuf",
          note: "Prix indicatif œuf petit calibre (≈650 COP)",
        },
        M: {
          value: 800,
          unit: "COP/œuf",
          note: "Prix moyen œuf calibre moyen (≈800 COP)",
        },
        L: {
          value: 900,
          unit: "COP/œuf",
          note: "Prix œuf grand calibre (≈900 COP)",
        },
        XL: {
          value: 1050,
          unit: "COP/œuf",
          note: "Prix œuf très grand calibre (≈1050 COP)",
        },
      },
      downgradedEggShare: {
        value: 0.08,
        unit: "ratio",
        note: "Part d’œufs déclassés ou invendables (~8%)",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },

    // Vente des poules en fin de cycle de ponte
    spentHenSale: {
      basis: "perBird",
      pricePerBird: {
        value: 5500,
        unit: "COP/poule/cycle",
        note: "Revente d’une poule pondeuse en fin de cycle (~5500 COP)",
      },
    },

    // Achat des animaux selon âge
    birdPurchase: {
      dayOldChick: {
        value: 1300,
        unit: "COP/poussin",
        note: "Poussin d’un jour (~1300 COP)",
      },
      oneWeekChick: {
        value: 1800,
        unit: "COP/poussin",
        note: "Poussin d’une semaine (~1800 COP)",
      },
      pullet15to18Weeks: {
        value: 15000,
        unit: "COP/poulette",
        note: "Jeune poulette prête à pondre (~15 000 COP)",
      },
      layingHen: {
        value: 16000,
        unit: "COP/poule",
        note: "Poule en ponte achetée (~16 000 COP)",
      },
    },

    // Coûts d’alimentation (prix par kilogramme d’aliment en COP)
    feed: {
      starterCostPerKg: {
        value: 3500,
        unit: "COP/kg",
        note: "Aliment de démarrage (jeunes oiseaux)",
      },
      growerCostPerKg: {
        value: 3300,
        unit: "COP/kg",
        note: "Aliment de croissance",
      },
      finisherCostPerKg: {
        value: 3100,
        unit: "COP/kg",
        note: "Aliment de pré-ponte/finition",
      },
      targetFeedIntakeKgPerHen: {
        starter: {
          value: 2.5,
          unit: "kg/poule/cycle",
          note: "Consommation d’aliment en phase de démarrage",
        },
        grower: {
          value: 6.5,
          unit: "kg/poule/cycle",
          note: "Consommation en phase de croissance",
        },
        finisher: {
          value: 3.5,
          unit: "kg/poule/cycle",
          note: "Consommation en phase de finition",
        },
        layer: {
          value: 48.0,
          unit: "kg/poule/cycle",
          note: "Consommation totale d’aliment pour la ponte",
        },
      },
    },

    // Charges d’exploitation (par poule / par cycle)
    operatingCosts: {
      vetCostPerHenCycle: {
        value: 1500,
        unit: "COP/poule/cycle",
        note: "Soins vétérinaires (vaccins, traitements)",
      },
      laborCostPerHour: {
        value: 12000,
        unit: "COP/h",
        note: "Coût horaire de la main-d’œuvre en Colombie",
      },
      laborHoursPerHenCycle: {
        value: 0.6,
        unit: "h/poule/cycle",
        note: "Temps de travail moyen par poule",
      },
      utilitiesCostPerHenCycle: {
        value: 900,
        unit: "COP/poule/cycle",
        note: "Eau, électricité, chauffage",
      },
      equipmentCostPerHenCycle: {
        value: 1300,
        unit: "COP/poule/cycle",
        note: "Amortissement du matériel (cages, abreuvoirs)",
      },
      otherCostPerHenCycle: {
        value: 1100,
        unit: "COP/poule/cycle",
        note: "Coûts divers (entretien, consommables)",
      },
    },

    // Performances techniques sur le cycle de ponte
    performance: {
      mortalityRate: {
        value: 0.1,
        unit: "ratio",
        min: 0,
        max: 1,
        note: "Taux de mortalité global (~10%)",
      },
      layingRate: {
        value: 0.78,
        unit: "ratio",
        min: 0,
        max: 1,
        note: "Taux moyen de ponte (~78% des poules pondantes)",
      },
      cycleDurationDays: {
        value: 430,
        unit: "jours",
        note: "Durée moyenne d’un cycle complet de ponte (~62 semaines)",
      },
      eggsPerHenPerCycle: {
        value: 0.78 * 430,
        unit: "œufs/poule/cycle",
        note: "Production totale moyenne par poule sur le cycle (~335 œufs)",
      },
    },
  },

  // -------------------------------------------------------------------------
  // POULETS DE CHAIR (BROILER) – marché Colombie
  // -------------------------------------------------------------------------
  broilers: {
    sale: {
      basis: "perKgLive",
      pricePerKgLive: {
        value: 7500,
        unit: "COP/kg vif",
        note: "Prix de vente moyen du poulet vivant au kilo",
      },
      pricePerBird: {
        value: 18000,
        unit: "COP/tête",
        note: "Prix moyen d’un poulet de chair (~2.4 kg)",
      },
      averageSaleWeightKg: {
        value: 2.4,
        unit: "kg/tête",
        note: "Poids vif moyen à la vente",
      },
    },

    birdPurchase: {
      broilerChick: {
        value: 1600,
        unit: "COP/poussin",
        note: "Prix d’un poussin de chair à la réception",
      },
    },

    feed: {
      starterCostPerKg: {
        value: 3500,
        unit: "COP/kg",
        note: "Aliment de démarrage poulet de chair",
      },
      growerCostPerKg: {
        value: 3300,
        unit: "COP/kg",
        note: "Aliment de croissance",
      },
      finisherCostPerKg: {
        value: 3100,
        unit: "COP/kg",
        note: "Aliment de finition",
      },
      targetFCR: {
        value: 2.0,
        unit: "kg aliment/kg gain",
        note: "Indice de consommation (FCR) moyen en Colombie",
      },
    },

    operatingCosts: {
      vetCostPerBirdCycle: {
        value: 800,
        unit: "COP/tête/cycle",
        note: "Soins vétérinaires par poulet sur cycle",
      },
      laborCostPerHour: {
        value: 12000,
        unit: "COP/h",
        note: "Coût horaire main-d’œuvre",
      },
      laborHoursPerBirdCycle: {
        value: 0.12,
        unit: "h/tête/cycle",
        note: "Temps moyen de travail par oiseau de chair",
      },
      utilitiesCostPerBirdCycle: {
        value: 500,
        unit: "COP/tête/cycle",
        note: "Eau, électricité pour poulet de chair",
      },
      equipmentCostPerBirdCycle: {
        value: 800,
        unit: "COP/tête/cycle",
        note: "Amortissement équipement de production",
      },
      otherCostPerBirdCycle: {
        value: 600,
        unit: "COP/tête/cycle",
        note: "Autres charges diverses",
      },
    },

    performance: {
      mortalityRate: {
        value: 0.07,
        unit: "ratio",
        note: "Taux de mortalité pour poulets de chair (~7%)",
      },
      cycleDurationDays: {
        value: 42,
        unit: "jours",
        note: "Durée d’un cycle de poulet de chair (~6 semaines)",
      },
      averageFinalWeightKg: {
        value: 2.4,
        unit: "kg",
        note: "Poids vif moyen final",
      },
      averageInitialWeightKg: {
        value: 0.04,
        unit: "kg",
        note: "Poids moyen d’un poussin à réception",
      },
      averageDailyGainKg: {
        value: 0.055,
        unit: "kg/jour",
        note: "Gain de poids moyen quotidien (~55 g/j)",
      },
    },
  },
};
