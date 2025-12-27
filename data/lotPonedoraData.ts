export interface LotPonedoraData {
  // Données théoriques agrégées pour un lot
  id: string;
  name: string;
  startDate: string; //  ISO: "YYYY-MM-DD"
  ageDays: number; // âge courant
  initialChicks: number;
}

export const lotPonedoraData: LotPonedoraData[] = [
  {
    id: "lot1",
    name: "lot1",
    startDate: "2025-01-01",
    ageDays: 0,
    initialChicks: 2500,
  },
];
