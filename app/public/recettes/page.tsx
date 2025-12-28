import React from "react";
import Image from "next/image";
import { recipes, type Recipe } from "@/app/public/recettes/recettesData";

function RecipeCard({ r }: { r: Recipe }) {
  const img = r.image?.[0]; // dans tes datas: ["huevos-rancheros-1.jpg", ...] [file:330]
  const src = img
    ? `/images/recettes/${img}`
    : `/images/recettes/placeholder.jpg`; // à créer

  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition">
      <div className="relative aspect-16/10 w-full bg-muted">
        <Image
          src={src}
          alt={r.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={r.featured === "high"}
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{r.title}</h3>
          <span className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground">
            {r.difficulty}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {r.description}
        </p>

        {!!r.tag?.length && (
          <div className="flex flex-wrap gap-1 pt-1">
            {r.tag.slice(0, 6).map((t) => (
              <span
                key={`${r.id}-${t}`}
                className="text-[11px] rounded-full bg-muted px-2 py-0.5 text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, items }: { title: string; items: Recipe[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {items.length} recettes
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <RecipeCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  const poules = recipes.filter((r) => r.category === "poule" && r.published);
  const oeufs = recipes.filter((r) => r.category === "oeuf" && r.published);

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Recettes de cuisine</h1>
        <p className="text-muted-foreground">Sélection : poules & oeufs</p>
      </header>

      <Section title="Poules" items={poules} />
      <Section title="Oeufs" items={oeufs} />
    </main>
  );
}
