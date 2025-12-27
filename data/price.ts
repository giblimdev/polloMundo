//@/data/price.ts
/* */

export interface SettingPrices {
  id: string;
  teamId: string;
  devise: string;
  change: number;

  //bétail
  costPoussinLayer: number;
  costPoussinBoiler: number;
  cost1WeekLayer: number;
  cost2WeekLayer: number;
  cost18WeekLayer: number;

  // Coûts d'alimentation (par kg)
  costAlimStarter: number;
  costAlimGrower: number;
  costAlimPreLay: number;
  costAlimLayer: number;

  // Prix de vente des œufs (unité)
  salePriceEggS: number;
  salePriceEggM: number;
  salePriceEggL: number;
  salePriceEggXL: number;
  /*
  // Prix de vente des œufs (douzaine)
  salePrice12EggS: number;
  salePrice12EggM: number;
  salePrice12EggL: number;
  salePrice12EggXL: number;
*/
  // Prix de vente des poules (par kg)
  salePriceLayKg: number; // pondeuses fin de cycle
  salePriceBoilerKg: number; // poulets de chair
}

export const settingPrices: SettingPrices = {
  id: "setting-demo",
  teamId: "team-demo",
  devise: "Cop",
  change: 4500, // cop pour un euro
  costPoussinLayer: 3900, // par unité
  costPoussinBoiler: 3750, // par unité
  cost1WeekLayer: 4900, // par unité
  cost2WeekLayer: 5900, // par unité
  cost18WeekLayer: 33000, // par unité
  costAlimStarter: 1600, //kg
  costAlimGrower: 1500, //kg
  costAlimPreLay: 1400, //Kg
  costAlimLayer: 1300, //Kg

  salePriceEggS: 200, // par unité
  salePriceEggM: 230, // par unité
  salePriceEggL: 270, // par unité
  salePriceEggXL: 300, // par unité

  salePriceLayKg: 5800, //kg
  salePriceBoilerKg: 7000, //kg
};
