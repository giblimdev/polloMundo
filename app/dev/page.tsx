// @/app/dev/page.tsx SIMPLIFIÉ
"use client";

import { useState } from "react";
import { Home, Code, Database, Users, ChevronRight } from "lucide-react";

type View = "home" | "scrum" | "architecture" | "schema";

export default function DevPage() {
  const [activeView, setActiveView] = useState<View>("home");

  const renderContent = () => {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">🚀 Page de Développement</h1>
        <p className="text-xl text-gray-600 mb-8">
          Vue active : <strong>{activeView}</strong>
        </p>
        <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
          <p className="mb-4">Les composants sont en cours de développement.</p>
          <p className="text-sm text-gray-500">
            Architecture, Scrum et Schema seront disponibles prochainement.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Code className="text-blue-600" />
              Développement
            </h2>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveView("home")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeView === "home"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Home size={20} />
                <span>Accueil</span>
              </button>

              <button
                onClick={() => setActiveView("scrum")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeView === "scrum"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Users size={20} />
                <span>Scrum & Planning</span>
              </button>

              <button
                onClick={() => setActiveView("architecture")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeView === "architecture"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Code size={20} />
                <span>Architecture</span>
              </button>

              <button
                onClick={() => setActiveView("schema")}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                  activeView === "schema"
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                <Database size={20} />
                <span>Schema BDD</span>
              </button>
            </nav>
          </div>

          <div className="flex-1 p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
