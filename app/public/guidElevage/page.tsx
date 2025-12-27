import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Thermometer,
  Droplets,
  Sun,
  Utensils,
  Stethoscope,
  Activity,
  AlertTriangle,
  Info,
  Egg,
  Clock,
} from "lucide-react";
import LifeCycle from "./lifeCycle";
import AlimentationGuide from "@/app/public/guidElevage/Alimentation";
//import Amenagement from "./Amenagement";

export default function GuideElevagePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">
            Guide Technique Élevage
          </h1>
          <p className="text-slate-500">
            Référentiel des standards pour poules pondeuses (Lohmann, ISA Brown)
          </p>
        </div>

        <Tabs defaultValue="cycle" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-100">
            <TabsTrigger value="cycle">Cycle de Vie</TabsTrigger>
            <TabsTrigger value="alimentation">Alimentation</TabsTrigger>
            <TabsTrigger value="environnement">Environnement</TabsTrigger>
            <TabsTrigger value="soins">Soins & Santé</TabsTrigger>
          </TabsList>

          {/* SECTION : CYCLE DE VIE */}
          <TabsContent value="cycle" className="space-y-6">
            <LifeCycle />
          </TabsContent>

          {/* SECTION 1 : ALIMENTATION */}
          <TabsContent value="alimentation" className="space-y-6">
            {/* Contenu statique ou futur composant alimentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-orange-500" />
                  Phases Nutritionnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AlimentationGuide />
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 2 : ENVIRONNEMENT */}
          <TabsContent value="environnement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-red-500" />
                  Température & Environnement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Contenu environnemental à mettre ici.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECTION 3 : SOINS */}
          <TabsContent value="soins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-6 w-6 text-green-600" />
                  Protocole Sanitaire Quotidien
                </CardTitle>
                <CardDescription>
                  Actions préventives pour maintenir le troupeau en bonne santé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">
                  Contenu soins & santé à mettre ici.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
