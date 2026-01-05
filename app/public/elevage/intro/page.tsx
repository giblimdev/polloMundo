import React from "react";

const racesHybrides = [
  {
    race: "Hy-Line Brown",
    oeuf: "Brun",
    prod: "300–330 œufs/an",
    atouts: "Très productive, docile, bonne résistance",
    remarques: "Excellente pour systèmes semi-intensifs",
    tag: "Recommandée",
  },
  {
    race: "Lohmann Brown",
    oeuf: "Brun",
    prod: "310–340 œufs/an",
    atouts: "Ponte précoce, bonne rusticité",
    remarques: "Très populaire en Amérique latine",
    tag: "Recommandée",
  },
  {
    race: "Isa Brown",
    oeuf: "Brun",
    prod: "300–320 œufs/an",
    atouts: "Faible consommation d’aliment, très régulière",
    remarques: "Sensible à la chaleur extrême",
    tag: "Populaire",
  },
  {
    race: "Dekalb White",
    oeuf: "Blanc",
    prod: "320–350 œufs/an",
    atouts: "Œufs uniformes, long cycle de ponte",
    remarques: "Adaptée aux élevages intensifs",
    tag: "Intensif",
  },
  {
    race: "Hy-Line W-36",
    oeuf: "Blanc",
    prod: "330–360 œufs/an",
    atouts: "Excellente longévité, faible mortalité",
    remarques: "Nécessite une bonne gestion nutritionnelle",
    tag: "Performance",
  },
  {
    race: "Hisex Brown / White",
    oeuf: "Brun ou blanc",
    prod: "300–320 œufs/an",
    atouts: "Bonne rentabilité, docile",
    remarques: "Courante en Amérique du Sud",
    tag: "Rentable",
  },
];

const racesRustiques = [
  {
    race: "Rhode Island Red",
    oeuf: "Brun",
    prod: "220–280 œufs/an",
    note: "Rustique, bonne pondeuse, viande correcte",
  },
  {
    race: "Sussex",
    oeuf: "Brun clair",
    prod: "250–300 œufs/an",
    note: "Polyvalente, calme, bonne adaptabilité",
  },
  {
    race: "Plymouth Rock",
    oeuf: "Brun",
    prod: "200–250 œufs/an",
    note: "Solide, supporte bien les variations climatiques",
  },
  {
    race: "Leghorn",
    oeuf: "Blanc",
    prod: "280–320 œufs/an",
    note: "Excellente pondeuse, alimentation économe (plus nerveuse)",
  },
  {
    race: "Nueva Castilla (Colombie)",
    oeuf: "Brun",
    prod: "220–260 œufs/an",
    note: "Race locale, adaptée au climat colombien",
  },
];

const racesMixtes = [
  {
    race: "Australorp",
    oeuf: "Brun",
    prod: "250–280 œufs/an",
    note: "Très calme, bon rapport œufs/viande",
  },
  {
    race: "Orpington",
    oeuf: "Brun clair",
    prod: "180–220 œufs/an",
    note: "Grande taille, bonne chair",
  },
  {
    race: "Marans",
    oeuf: "Brun foncé",
    prod: "200–250 œufs/an",
    note: "Œufs foncés, marché de niche",
  },
];

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "green" | "blue" | "amber";
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset";
  const styles: Record<string, string> = {
    default: "bg-muted text-foreground ring-border",
    green:
      "bg-emerald-500/15 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300",
    blue: "bg-sky-500/15 text-sky-700 ring-sky-600/20 dark:text-sky-300",
    amber:
      "bg-amber-500/15 text-amber-700 ring-amber-600/20 dark:text-amber-300",
  };
  return <span className={`${base} ${styles[variant]}`}>{children}</span>;
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card/60 p-5 shadow-sm backdrop-blur">
      <h3 className="text-sm font-semibold tracking-wide text-foreground">
        {title}
      </h3>
      <div className="mt-3 text-sm text-muted-foreground space-y-2">
        {children}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/15 via-sky-500/10 to-amber-500/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="green">Élevage pondeuses</Badge>
              <Badge variant="blue">Popayán • Cauca</Badge>
              <Badge variant="amber">Ovolia</Badge>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Présentation du projet – Ovolia
            </h1>

            <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
              Un projet d’élevage de poules pondeuses à Popayán axé sur la
              qualité des œufs, la biosécurité, le bien-être animal, la
              traçabilité et la rentabilité, avec une logique de valorisation
              locale et d’économie circulaire.
            </p>

            <div className="grid gap-3 md:grid-cols-3">
              <Card title="Objectif">
                <p>
                  Produire des œufs frais de haute qualité pour le marché local
                  et régional.
                </p>
              </Card>
              <Card title="Méthode">
                <p>
                  Pratiques modernes, gestion rigoureuse des lots, suivi
                  zootechnique & sanitaire.
                </p>
              </Card>
              <Card title="Impact">
                <p>
                  Emploi local, autonomie alimentaire, valorisation des
                  sous-produits (compost, etc.).
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-10">
        {/* Détails projet */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Structure de l’unité avicole
            </h2>
            <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>
                Bâtiments adaptés au climat de Popayán, ventilation et
                alimentation (semi) automatisée.
              </li>
              <li>
                Poules sélectionnées pour productivité et résistance sanitaire.
              </li>
              <li>
                Alimentation équilibrée (matières premières locales si
                possible).
              </li>
              <li>Protocoles de biosécurité + registres de production.</li>
              <li>
                Commercialisation: marchés urbains, hôtels, restaurants,
                coopératives.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">Contribution & durabilité</h2>
            <ul className="mt-4 list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>
                Création d’emplois (jeunes, femmes rurales) et dynamisation
                locale.
              </li>
              <li>Renforcement de l’autonomie alimentaire de la région.</li>
              <li>
                Économie circulaire: valorisation fientes/coquilles (compost,
                fertilisation).
              </li>
              <li>
                Diffusion de bonnes pratiques et gestion responsable des
                ressources.
              </li>
            </ul>

            <div className="mt-4 rounded-xl border bg-muted/40 p-4 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="green">Qualité</Badge>
                <Badge variant="blue">Traçabilité</Badge>
                <Badge variant="amber">Rentabilité</Badge>
              </div>
              <p className="mt-2 text-muted-foreground">
                L’approche “intégrée” combine innovation, formation et
                accompagnement technique.
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-5xl space-y-6">
            {/* Titre */}
            <div className="rounded-2xl border bg-linear-to-br from-amber-500/15 via-emerald-500/10 to-sky-500/10 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:text-amber-300">
                  Décision souche
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:text-emerald-300">
                  Œufs bruns
                </span>
                <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:text-sky-300">
                  Projet Ovolia • Popayán
                </span>
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Pourquoi nous choisissons la souche Hy‑Line Brown
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
                Le choix de la Hy‑Line Brown est guidé par un objectif clair :
                maximiser la rentabilité et la stabilité de production d’œufs
                bruns, tout en gardant une conduite simple et standardisable.
              </p>
            </div>

            {/* Résumé décision */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border bg-card p-5">
                <h3 className="text-sm font-semibold">Choix retenu</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Souche commerciale “œuf brun” : Hy‑Line Brown.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <h3 className="text-sm font-semibold">Pourquoi maintenant</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pour verrouiller une base génétique stable avant d’investir
                  dans le bâtiment, l’équipement et les contrats
                  d’approvisionnement.
                </p>
              </div>

              <div className="rounded-2xl border bg-card p-5">
                <h3 className="text-sm font-semibold">Impact attendu</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Meilleure prévisibilité des coûts (aliment) et des volumes
                  (œufs) sur le cycle.
                </p>
              </div>
            </div>

            {/* Arguments */}
            <div className="rounded-2xl border bg-card p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                Arguments clés (orientés performance)
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-muted/30 p-5">
                  <h3 className="font-medium">
                    1) Efficacité alimentaire (poste #1 des coûts)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les standards Hy‑Line Brown donnent des repères d’ingéré
                    moyen d’environ{" "}
                    <span className="font-medium">109–117 g/jour</span> selon
                    période/conditions, et une conversion autour de{" "}
                    <span className="font-medium">
                      2.06–2.14 kg d’aliment/kg d’œufs
                    </span>{" "}
                    (références sur plages de semaines). [web:139]
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Concrètement : une meilleure conversion = moins de kg
                    d’aliment pour produire la même masse d’œufs, donc une marge
                    plus stable quand le prix de l’aliment monte. [web:139]
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <h3 className="font-medium">
                    2) Efficacité “par œufs” (très lisible en pilotage)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les standards publient aussi des repères de consommation par
                    10 œufs d’environ{" "}
                    <span className="font-medium">1.23–1.28 kg/10 œufs</span>{" "}
                    (sur 20–60 semaines) et{" "}
                    <span className="font-medium">1.28–1.34 kg/10 œufs</span>{" "}
                    (sur 20–100 semaines), ce qui aide à suivre la performance
                    avec un KPI simple en exploitation. [web:139]
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <h3 className="font-medium">
                    3) Cycle long possible (projection 80 semaines +)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Les documents Hy‑Line présentent des objectifs et repères
                    sur des cycles étendus (jusqu’à 90–100 semaines selon
                    éditions), ce qui est compatible avec une stratégie de cycle
                    long si la qualité coquille et la viabilité suivent.
                    [web:139][web:150]
                  </p>
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <h3 className="font-medium">
                    4) Standardisation de conduite (répétable)
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Le choix d’une souche “standard” avec guide de performance
                    facilite la mise en place de procédures (SOP) : courbe
                    d’ingéré, suivi IC, objectifs de ponte, contrôle du calibre
                    et routines de pesées. [web:174]
                  </p>
                </div>
              </div>
            </div>

            {/* Ce que cela implique côté alimentation */}
            <div className="rounded-2xl border bg-card p-6 space-y-3">
              <h2 className="text-lg font-semibold">
                Implications sur l’alimentation (plan simple)
              </h2>
              <p className="text-sm text-muted-foreground">
                Le choix Hy‑Line Brown implique surtout une alimentation par
                phases et une transition pré‑ponte → pondeuse bien maîtrisée,
                avec pilotage de l’ingéré et du calcium pour la coquille.
                [web:174]
              </p>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="text-sm font-semibold">Starter</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    0–6 sem
                  </div>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="text-sm font-semibold">
                    Grower / Developer
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    7–16 sem
                  </div>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="text-sm font-semibold">Pré‑ponte</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    ~17–20 sem
                  </div>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="text-sm font-semibold">Pondeuse</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    entrée en ponte → fin cycle
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-linear-to-br from-emerald-500/10 to-sky-500/10 p-4">
                <p className="text-sm text-muted-foreground">
                  KPI alimentaire à suivre dès le démarrage : ingéré (g/j), IC
                  (kg alim/kg œufs), et consommation/10 œufs (kg) comme
                  indicateur opérationnel. [web:139]
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Races hybrides - tableau */}
        <section className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Races commerciales hybrides
              </h2>
              <p className="text-sm text-muted-foreground">
                Races issues de sélection/croisements pour maximiser ponte,
                régularité et efficacité alimentaire.
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="green">
                Conseillé Popayán: Lohmann / Hy-Line Brown
              </Badge>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:font-semibold">
                  <th>Race</th>
                  <th>Œuf</th>
                  <th>Production</th>
                  <th className="min-w-70">Atouts</th>
                  <th className="min-w-65">Remarques</th>
                  <th>Tag</th>
                </tr>
              </thead>
              <tbody className="[&>tr]:border-t">
                {racesHybrides.map((r) => (
                  <tr
                    key={r.race}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">{r.race}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.oeuf}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.prod}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.atouts}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {r.remarques}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          r.tag === "Recommandée"
                            ? "green"
                            : r.tag === "Performance"
                            ? "blue"
                            : "amber"
                        }
                      >
                        {r.tag}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground">
            Les chiffres de production varient selon souche, conduite, climat,
            alimentation et système (sol/cage/plein air).
          </p>
        </section>

        {/* Rustiques + Mixtes */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Races traditionnelles (rustiques)
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Moins productives, souvent plus robustes et adaptées aux systèmes
              extensifs.
            </p>

            <div className="mt-4 space-y-3">
              {racesRustiques.map((r) => (
                <div key={r.race} className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{r.race}</div>
                    <Badge variant="default">
                      {r.oeuf} • {r.prod}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Races mixtes (œufs + viande)
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Pour un modèle polyvalent: œufs + valorisation des réformes /
              viande.
            </p>

            <div className="mt-4 space-y-3">
              {racesMixtes.map((r) => (
                <div key={r.race} className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{r.race}</div>
                    <Badge variant="default">
                      {r.oeuf} • {r.prod}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="rounded-2xl border bg-linear-to-br from-emerald-500/10 via-sky-500/10 to-amber-500/10 p-6">
          <h2 className="text-lg font-semibold">Note de conduite</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Les objectifs de consommation, de ponte et de calibre dépendent de
            la souche et du système (sol, cage, plein air), ainsi que du climat
            et du niveau de biosécurité.
          </p>
        </section>
      </div>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Titre */}
        <div className="rounded-2xl border bg-linear-to-br from-amber-500/15 via-emerald-500/10 to-sky-500/10 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:text-amber-300">
              Décision souche
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:text-emerald-300">
              Œufs bruns
            </span>
            <span className="inline-flex items-center rounded-full bg-sky-500/15 px-3 py-1 text-xs font-medium text-sky-700 ring-1 ring-inset ring-sky-600/20 dark:text-sky-300">
              Projet Ovolia • Popayán
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            Pourquoi nous choisissons la souche Hy‑Line Brown
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
            Le choix de la Hy‑Line Brown est guidé par un objectif clair :
            maximiser la rentabilité et la stabilité de production d’œufs bruns,
            tout en gardant une conduite simple et standardisable.
          </p>
        </div>

        {/* Résumé décision */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Choix retenu</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Souche commerciale “œuf brun” : Hy‑Line Brown.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Pourquoi maintenant</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Pour verrouiller une base génétique stable avant d’investir dans
              le bâtiment, l’équipement et les contrats d’approvisionnement.
            </p>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-semibold">Impact attendu</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Meilleure prévisibilité des coûts (aliment) et des volumes (œufs)
              sur le cycle.
            </p>
          </div>
        </div>

        {/* Arguments */}
        <div className="rounded-2xl border bg-card p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Arguments clés (orientés performance)
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-medium">
                1) Efficacité alimentaire (poste #1 des coûts)
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Les standards Hy‑Line Brown donnent des repères d’ingéré moyen
                d’environ <span className="font-medium">109–117 g/jour</span>{" "}
                selon période/conditions, et une conversion autour de{" "}
                <span className="font-medium">
                  2.06–2.14 kg d’aliment/kg d’œufs
                </span>{" "}
                (références sur plages de semaines). [web:139]
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Concrètement : une meilleure conversion = moins de kg d’aliment
                pour produire la même masse d’œufs, donc une marge plus stable
                quand le prix de l’aliment monte. [web:139]
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-medium">
                2) Efficacité “par œufs” (très lisible en pilotage)
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Les standards publient aussi des repères de consommation par 10
                œufs d’environ{" "}
                <span className="font-medium">1.23–1.28 kg/10 œufs</span> (sur
                20–60 semaines) et{" "}
                <span className="font-medium">1.28–1.34 kg/10 œufs</span> (sur
                20–100 semaines), ce qui aide à suivre la performance avec un
                KPI simple en exploitation. [web:139]
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-medium">
                3) Cycle long possible (projection 80 semaines +)
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Les documents Hy‑Line présentent des objectifs et repères sur
                des cycles étendus (jusqu’à 90–100 semaines selon éditions), ce
                qui est compatible avec une stratégie de cycle long si la
                qualité coquille et la viabilité suivent. [web:139][web:150]
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-5">
              <h3 className="font-medium">
                4) Standardisation de conduite (répétable)
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Le choix d’une souche “standard” avec guide de performance
                facilite la mise en place de procédures (SOP) : courbe d’ingéré,
                suivi IC, objectifs de ponte, contrôle du calibre et routines de
                pesées. [web:174]
              </p>
            </div>
          </div>
        </div>

        {/* Ce que cela implique côté alimentation */}
        <div className="rounded-2xl border bg-card p-6 space-y-3">
          <h2 className="text-lg font-semibold">
            Implications sur l’alimentation (plan simple)
          </h2>
          <p className="text-sm text-muted-foreground">
            Le choix Hy‑Line Brown implique surtout une alimentation par phases
            et une transition pré‑ponte → pondeuse bien maîtrisée, avec pilotage
            de l’ingéré et du calcium pour la coquille. [web:174]
          </p>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-semibold">Starter</div>
              <div className="mt-1 text-xs text-muted-foreground">0–6 sem</div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-semibold">Grower / Developer</div>
              <div className="mt-1 text-xs text-muted-foreground">7–16 sem</div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-semibold">Pré‑ponte</div>
              <div className="mt-1 text-xs text-muted-foreground">
                ~17–20 sem
              </div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-semibold">Pondeuse</div>
              <div className="mt-1 text-xs text-muted-foreground">
                entrée en ponte → fin cycle
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-linear-to-br from-emerald-500/10 to-sky-500/10 p-4">
            <p className="text-sm text-muted-foreground">
              KPI alimentaire à suivre dès le démarrage : ingéré (g/j), IC (kg
              alim/kg œufs), et consommation/10 œufs (kg) comme indicateur
              opérationnel. [web:139]
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
