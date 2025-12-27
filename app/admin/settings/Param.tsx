// @/app/admin/Param.tsx
// -----------------------------------------------------------------------------
// Composant d'affichage des paramètres administratifs PolloMondo
// Affiche les valeurs du fichier paramData.ts sous forme lisible et moderne
// -----------------------------------------------------------------------------

"use client";

import React from "react";
import { ADMIN_PARAMS } from "@/app/admin/settings/paramData";

// Un composant générique pour afficher un bloc de paramètres
function ParamBlock({
  title,
  data,
  color = "amber",
}: {
  title: string;
  data: Record<string, any>;
  color?: "amber" | "emerald" | "blue";
}) {
  return (
    <section
      className={`bg-white rounded-2xl shadow p-6 border-t-4 border-${color}-400`}
    >
      <h2
        className={`text-2xl font-semibold text-${color}-700 mb-4 capitalize`}
      >
        {title}
      </h2>

      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border-l-4 pl-3 border-gray-200">
            {typeof value === "object" && "value" in value ? (
              <div>
                <p className="font-medium text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, " $1")} :{" "}
                  <span className={`text-${color}-700 font-semibold`}>
                    {value.value.toLocaleString()} {value.unit || ""}
                  </span>
                </p>
                {value.note && (
                  <p className="text-sm text-gray-500">{value.note}</p>
                )}
              </div>
            ) : typeof value === "object" ? (
              <ParamBlock
                title={key}
                data={value}
                color={color === "amber" ? "blue" : "emerald"}
              />
            ) : (
              <p>
                <span className="font-semibold">{key}:</span> {String(value)}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Param() {
  const { meta, layers, broilers } = ADMIN_PARAMS;

  return (
    <div className="p-8 space-y-10 bg-gray-50 min-h-screen">
      {/* En-tête principale */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Paramètres PolloMondo
        </h1>
        <p className="text-gray-600 mt-2">
          Marché : {meta.locale} — Devise : {meta.currency}
        </p>
        <p className="text-sm text-gray-400">
          Dernière mise à jour :{" "}
          {new Date(meta.lastUpdatedISO).toLocaleDateString(meta.locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {/* Section Poules pondeuses */}
      <ParamBlock title="Pondeuses (Layers)" data={layers} color="amber" />

      {/* Section Poulets de chair */}
      <ParamBlock
        title="Poulets de chair (Broilers)"
        data={broilers}
        color="emerald"
      />
    </div>
  );
}
