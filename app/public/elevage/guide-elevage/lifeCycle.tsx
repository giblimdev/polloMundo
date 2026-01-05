//@/app/public/lifeCycle.tsx
/* Affiche les données du cycle de vie à partir de lifeCycleData.tsx */

import React from "react";
import { lifeCycleData, LifeCyclePhase } from "./lifeCycleData";
import { Badge } from "@/components/ui/badge";
import { Clock, Thermometer, Droplets, Sun, Egg, Syringe } from "lucide-react";

export default function LifeCycle() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Cycle de Vie d'une Poule Pondeuse
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lifeCycleData.map((phase: LifeCyclePhase) => (
            <div
              key={phase.order}
              className="bg-white shadow-lg border-l-4 border-purple-500 hover:shadow-2xl transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {/* Titre */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <h2 className="font-semibold text-lg">{phase.title}</h2>
                  <Badge className="ml-auto">{phase.semaine}</Badge>
                </div>
                <p className="text-sm text-slate-500">{phase.jour}</p>

                {/* Données principales */}
                <div className="space-y-1 text-sm text-slate-700">
                  <p>
                    <span className="font-medium">Poids cible :</span>{" "}
                    {phase.poidsCible}
                  </p>
                  <p>
                    <span className="font-medium">Alimentation :</span>{" "}
                    {phase.alimentationType}
                  </p>
                  <p>
                    <span className="font-medium">Quantité :</span>{" "}
                    {phase.alimentation}
                  </p>

                  {/* Eau */}
                  <p className="flex items-start gap-1">
                    <Droplets className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>
                      <span className="font-medium">Eau :</span> {phase.eau}
                    </span>
                  </p>

                  {/* Température */}
                  <p className="flex items-center gap-1">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <span>
                      <span className="font-medium">Température :</span>{" "}
                      {phase.temperature}
                    </span>
                  </p>

                  {/* Luminosité */}
                  <p className="flex items-center gap-1">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span>
                      <span className="font-medium">Luminosité :</span>{" "}
                      {phase.luminosite}
                    </span>
                  </p>

                  {/* Hygrométrie */}
                  <p className="flex items-center gap-1">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span>
                      <span className="font-medium">Hygrométrie :</span>{" "}
                      {phase.hygrometrie}
                    </span>
                  </p>

                  <p>
                    <span className="font-medium">Taux de ponte :</span>{" "}
                    {phase.tauxPonte}
                  </p>
                </div>

                {/* Répartition des œufs */}
                {phase.repartitionOeufs && (
                  <div className="mt-2 p-3 bg-yellow-50 rounded border border-yellow-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Egg className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-sm">
                        Répartition œufs :
                      </span>
                    </div>
                    <ul className="text-xs text-slate-600 list-disc list-inside grid grid-cols-2 gap-1">
                      <li>S : {phase.repartitionOeufs.S}%</li>
                      <li>M : {phase.repartitionOeufs.M}%</li>
                      <li>L : {phase.repartitionOeufs.L}%</li>
                      <li>XL : {phase.repartitionOeufs.XL}%</li>
                    </ul>
                    <p className="text-xs mt-1">
                      <span className="font-medium">Poids moyen :</span>{" "}
                      {phase.poidsMoyenOeuf}
                    </p>
                  </div>
                )}

                {/* Soins & Vaccins */}
                {phase.soins && (
                  <div className="mt-3 p-3 bg-green-50 rounded border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Syringe className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-sm text-green-800">
                        Soins & Vaccination
                      </span>
                    </div>

                    {phase.soins.vaccins && (
                      <div className="text-xs text-slate-700 mb-2">
                        <span className="font-medium text-green-700">
                          Vaccins :
                        </span>
                        <ul className="list-disc list-inside text-xs mt-1">
                          {phase.soins.vaccins.map((v, i) => (
                            <li key={i}>{v}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {phase.soins.vermifuge && (
                      <p className="text-xs text-slate-700">
                        <span className="font-medium text-green-700">
                          Vermifuge :
                        </span>{" "}
                        {phase.soins.vermifuge}
                      </p>
                    )}

                    {phase.soins.antiparasitaire && (
                      <p className="text-xs text-slate-700">
                        <span className="font-medium text-green-700">
                          Antiparasitaire :
                        </span>{" "}
                        {phase.soins.antiparasitaire}
                      </p>
                    )}

                    {phase.soins.autres && (
                      <div className="text-xs text-slate-700 mt-1">
                        <span className="font-medium text-green-700">
                          Autres :
                        </span>
                        <ul className="list-disc list-inside mt-1">
                          {phase.soins.autres.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Objectif production */}
                {phase.objectifProduction && (
                  <p className="text-xs text-slate-500 italic mt-2">
                    <span className="font-medium">Objectif production :</span>{" "}
                    {phase.objectifProduction}
                  </p>
                )}

                {/* Sources */}
                {phase.sources && (
                  <p className="text-xs text-slate-400 mt-2">
                    Sources : {phase.sources.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
/* Données du cycle de vie des poules pondeuses */
