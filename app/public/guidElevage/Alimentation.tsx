import React from "react";
import {
  alimentation,
  type AlimentationType,
} from "@/app/public/guidElevage/alimentationData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, Clock, Target, Lightbulb } from "lucide-react";

export default function AlimentationGuide() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Guide d'Alimentation des Poules Pondeuses
        </h1>
        <p className="text-slate-600">
          Nutrition adaptée à chaque phase du cycle de vie
        </p>
      </div>

      <div className="space-y-6">
        {alimentation.map((aliment: AlimentationType, index: number) => (
          <Card
            key={aliment.id}
            className="border-l-4 hover:shadow-lg transition-all duration-300"
            style={{
              borderLeftColor: getPhaseColor(index),
            }}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      backgroundColor: `${getPhaseColor(index)}20`,
                    }}
                  >
                    <Utensils
                      className="h-6 w-6"
                      style={{ color: getPhaseColor(index) }}
                    />
                  </div>
                  <div>
                    <div>{aliment.nom}</div>
                    <div className="text-sm font-normal text-slate-500">
                      {aliment.type_commercial}
                    </div>
                  </div>
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-sm font-medium"
                  style={{
                    borderColor: getPhaseColor(index),
                    color: getPhaseColor(index),
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Semaines {aliment.periode_debut_semaines} -{" "}
                  {aliment.periode_fin_semaines}
                </Badge>
              </div>

              <CardDescription className="flex items-start gap-2 text-base">
                <Target className="h-5 w-5 mt-0.5 shrink-0 text-slate-400" />
                <span>{aliment.objectif}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Caractéristiques nutritionnelles */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: getPhaseColor(index) }}
                  />
                  Caractéristiques nutritionnelles
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <InfoCard
                    label="Protéines"
                    value={aliment.caracteristiques.proteines_pourcentage}
                    color={getPhaseColor(index)}
                  />
                  <InfoCard
                    label="Énergie"
                    value={aliment.caracteristiques.energie}
                    color={getPhaseColor(index)}
                  />
                  <InfoCard
                    label="Calcium"
                    value={aliment.caracteristiques.calcium_pourcentage}
                    color={getPhaseColor(index)}
                  />
                  <InfoCard
                    label="Phosphore disponible"
                    value={aliment.caracteristiques.phosphore_disponible}
                    color={getPhaseColor(index)}
                  />
                  <InfoCard
                    label="Granulométrie"
                    value={aliment.caracteristiques.granulometrie}
                    color={getPhaseColor(index)}
                  />
                  <InfoCard
                    label="Acides aminés clés"
                    value={aliment.caracteristiques.acides_amines_cles}
                    color={getPhaseColor(index)}
                  />
                  {aliment.caracteristiques.fibres && (
                    <InfoCard
                      label="Fibres"
                      value={aliment.caracteristiques.fibres}
                      color={getPhaseColor(index)}
                    />
                  )}
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-lg space-y-2">
                  <p className="text-sm">
                    <span className="font-medium text-slate-900">
                      Vitamines & minéraux :
                    </span>{" "}
                    <span className="text-slate-700">
                      {aliment.caracteristiques.vitamines_mineraux}
                    </span>
                  </p>
                  {aliment.caracteristiques.source_calcium && (
                    <p className="text-sm">
                      <span className="font-medium text-slate-900">
                        Source de calcium :
                      </span>{" "}
                      <span className="text-slate-700">
                        {aliment.caracteristiques.source_calcium}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Conseils pratiques */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Conseils pratiques
                </h4>
                <ul className="space-y-2">
                  {aliment.conseils_pratiques.map(
                    (conseil: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >
                        <div
                          className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: getPhaseColor(index) }}
                        />
                        <span>{conseil}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Composant pour afficher une information dans une carte
function InfoCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

// Fonction pour obtenir une couleur selon la phase
function getPhaseColor(index: number): string {
  const colors = [
    "#f59e0b", // Amber - Démarrage
    "#10b981", // Emerald - Croissance
    "#3b82f6", // Blue - Pré-ponte
    "#8b5cf6", // Violet - Ponte
    "#ec4899", // Pink - Fin de cycle
  ];
  return colors[index] || "#6b7280";
}
/* */
