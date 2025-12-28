"use client";

import React, { useMemo } from "react";
import { FileText } from "lucide-react";

// shadcn.io CodeBlock (Shiki)
import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/shadcn-io/code-block";

type PrismaBlock =
  | { kind: "header"; title: string; code: string }
  | { kind: "model"; title: string; modelName: string; code: string };

function splitPrismaSchema(schemaText: string): PrismaBlock[] {
  const text = schemaText.replace(/\r\n/g, "\n").trim();

  // capture "model Name { ... }" (multiline, closing brace at line start)
  const modelRegex = /^model\s+([A-Za-z][A-Za-z0-9_]*)\s*\{[\s\S]*?^\}/gm;

  const matches: Array<{
    name: string;
    start: number;
    end: number;
    code: string;
  }> = [];

  let m: RegExpExecArray | null;
  while ((m = modelRegex.exec(text)) !== null) {
    const full = m[0];
    matches.push({
      name: m[1],
      start: m.index,
      end: m.index + full.length,
      code: full.trim(),
    });
  }

  const blocks: PrismaBlock[] = [];

  // header = everything before first model (generator/datasource/etc.)
  const firstStart = matches.length ? matches[0].start : text.length;
  const header = text.slice(0, firstStart).trim();
  if (header) {
    blocks.push({
      kind: "header",
      title: "Schema header (generator/datasource)",
      code: header,
    });
  }

  // one block per model
  for (const mm of matches) {
    blocks.push({
      kind: "model",
      title: `model ${mm.name}`,
      modelName: mm.name,
      code: mm.code,
    });
  }

  // fallback: if no models matched, show all as header
  if (!blocks.length) {
    blocks.push({
      kind: "header",
      title: "schema.prisma",
      code: text,
    });
  }

  return blocks;
}

function ModelCard({ title, code }: { title: string; code: string }) {
  const data = useMemo(
    () => [
      {
        // IMPORTANT: CodeBlock uses "language" as the internal selected value + copy source. [page:0]
        language: title, // unique value per card
        filename: `${title}.prisma`,
        code,
      },
    ],
    [title, code]
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <FileText size={16} className="text-muted-foreground" />
        <div className="font-semibold text-sm">{title}</div>
      </div>

      <div className="p-3">
        <CodeBlock data={data} defaultValue={data[0].language}>
          <CodeBlockHeader>
            <CodeBlockFiles>
              {(item) => (
                <CodeBlockFilename key={item.language} value={item.language}>
                  {item.filename}
                </CodeBlockFilename>
              )}
            </CodeBlockFiles>
            <CodeBlockCopyButton />
          </CodeBlockHeader>

          <CodeBlockBody>
            {(item) => (
              <CodeBlockItem key={item.language} value={item.language}>
                {/* keep real highlighting language = prisma */}
                <CodeBlockContent language={"prisma" as BundledLanguage}>
                  {item.code}
                </CodeBlockContent>
              </CodeBlockItem>
            )}
          </CodeBlockBody>
        </CodeBlock>
      </div>
    </div>
  );
}

export default function Svhema2() {
  const prismaSchema = `

model User {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  emailVerified Boolean  @default(false)
  image         String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Auth relations
  sessions Session[]
  accounts Account[]

  // Business relations
  ownedTeams Team[] @relation("TeamOwner")
  userTeams  UserTeam[]

  createdItems       Item[]        @relation("ItemCreator")
  createdEquipements Equipement[]  @relation("EquipementCreator")
  createdLots        Lot[]         @relation("LotCreator")
  createdLifeInfos   LifeInfo[]     @relation("LifeInfoCreator")

  createdLotEvents   LotEvent[]     @relation("LotEventCreator")
  createdCalendarEvents CalendarEvent[] @relation("CalendarEventCreator")

  createdEnvironements environement[] @relation("EnvironementCreator")

  @@map("users")
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  ipAddress String?
  userAgent String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([userId])
  @@map("sessions")
}

model Account {
  id         String @id @default(cuid())
  accountId  String
  providerId String
  userId     String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@unique([providerId, accountId])
  @@index([userId])
  @@map("accounts")
}

model Verification {
  id         String   @id @default(cuid())
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier, value])
  @@map("verifications")
}

//////////////////
/////   Dev  /////
//////////////////
model Item {
  id          String  @id @default(cuid())
  order       Int     @default(0)
  name        String
  description String?
  parentId    String?

  // Relations
  parent   Item?  @relation("ItemHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children Item[] @relation("ItemHierarchy")

  // Metadata
  createdById String
  createdBy   User     @relation("ItemCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([parentId])
  @@index([createdById])
  @@map("items")
}

//////////////////////
//////   Teams   /////
//////////////////////
model Team {
  id       String @id @default(cuid())
  order    Int    @default(0)
  name     String
  type     String @default("TEAM") // ORGANIZATION | TEAM | FARM
  parentId String?

  // Relations
  parent    Team?   @relation("TeamHierarchy", fields: [parentId], references: [id], onDelete: Cascade)
  children  Team[]  @relation("TeamHierarchy")
  members   UserTeam[]
  batiments Batiment[]

  // 1-1 with Setting
  setting Setting?

  // Calendar
  calendarEvents CalendarEvent[]

  // Metadata
  ownerId   String
  owner     User     @relation("TeamOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([parentId])
  @@index([ownerId])
  @@index([type])
  @@map("teams")
}

model UserTeam {
  id     String @id @default(cuid())
  teamId String
  userId String
  role   String @default("member") // owner|admin|member|viewer

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  joinedAt DateTime @default(now())

  @@unique([teamId, userId])
  @@index([teamId])
  @@index([userId])
  @@map("user_teams")
}

////////////////////////
//////   Farming   /////
////////////////////////
model Batiment {
  id       String @id @default(cuid())
  order    Int    @default(0)
  name     String
  surface  Float
  capacity Int
  teamId   String

  // Relations
  team        Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  lots        Lot[]
  equipements Equipement[]

  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([teamId])
  @@map("batiments")
}

model Equipement {
  id                  String @id @default(cuid())
  order               Int    @default(0)
  name                String
  description         String?
  legalNorms          String?
  maintenanceSchedule String?
  batimentId          String

  // Relations
  batiment Batiment @relation(fields: [batimentId], references: [id], onDelete: Cascade)

  // Metadata
  createdById String
  createdBy   User     @relation("EquipementCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([batimentId])
  @@index([createdById])
  @@map("equipements")
}

/////////////////////////
//////   Breeding   /////
/////////////////////////
model Lot {
  id            String   @id @default(cuid())
  order         Int      @default(0)
  name          String
  status        String   @default("ACTIVE")
  startDate     DateTime @default(now())
  actualEndDate DateTime?
  plannedEndDate DateTime?
  initialChicks Int
  initialAge    Int
  currentAge    Int

  // Relations
  batimentId String
  batiment   Batiment @relation(fields: [batimentId], references: [id], onDelete: Cascade)

  // 1 Lot -> N LifeInfo (journalier)
  lifeInfos LifeInfo[]

  // 1 Lot -> N LotEvent
  events LotEvent[]

  // Lot -> environement (optionnel)
  environementId String?
  environement   environement? @relation(fields: [environementId], references: [id], onDelete: SetNull)

  // Metadata
  createdById String
  createdBy   User     @relation("LotCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([batimentId])
  @@index([status])
  @@index([startDate])
  @@index([environementId])
  @@map("lots")
}

model LotEvent {
  id         String @id @default(cuid())
  order      Int    @default(0)
  eventType  String // dc | cost | revenue

  deadCount   Int?
  costfood    Float?
  revenueSale Float?

  // Relation to Lot (optional in your original intent? Here: required)
  lotId String
  lot   Lot @relation(fields: [lotId], references: [id], onDelete: Cascade)

  // Metadata
  createdById String
  createdBy   User     @relation("LotEventCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([lotId])
  @@index([createdById])
  @@map("lot_events")
}

model LifeInfo {
  id         String @id @default(cuid())
  order      Int    @default(0)
  jAge       String
  AlimType   String
  feedAmount Int

  // Relation to Lot (journalier)
  lotId String
  lot   Lot @relation(fields: [lotId], references: [id], onDelete: Cascade)

  // Metadata
  createdById String
  createdBy   User     @relation("LifeInfoCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([lotId])
  @@index([createdById])
  @@map("life_infos")
}

///////////////////////
/////   Setting   /////
///////////////////////
model Setting {
  id     String @id @default(cuid())
  teamId String @unique

  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  // Coûts d'alimentation (par kg)
  costAlimStarter Float
  costAlimGrower  Float
  costAlimPreLay  Float
  costAlimLayer   Float

  // Prix de vente des œufs (par œuf)
  salePriceEggS  Float
  salePriceEggM  Float
  salePriceEggL  Float
  salePriceEggXL Float

  // Prix de vente des poules (par kg)
  salePriceLayKg    Float
  salePriceBoilerKg Float

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("settings")
}

model environement {
  id       String @id @default(cuid())
  order    Int    @default(0)
  category String @default("LAYING") // LAYING | BROILER
  phase    String
  objective String
  dayStart Int
  dayEnd   Int
  weekStart Int
  weekEnd   Int

  minTemperature Float
  maxTemperature Float
  minHumidity    Float
  maxHumidity    Float
  minLightHours  Float
  maxLightHours  Float
  feedType       String
  minFeedQuantity Float
  maxFeedQuantity Float
  minWeight      Float
  maxWeight      Float
  minLayingRate  Float
  maxLayingRate  Float
  minEggsPerHen  Float
  maxEggsPerHen  Float
  minMortalityRate Float
  maxMortalityRate Float

  // Relations (1 environement -> N lots)
  lots Lot[]

  // Metadata
  createdById String
  createdBy   User     @relation("EnvironementCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([phase])
  @@index([createdById])
  @@map("breeding")
}

//////////////////////////
/////   Calendrier   /////
//////////////////////////
model CalendarEvent {
  id          String   @id @default(cuid())
  title       String
  description String?
  startDate   DateTime
  endDate     DateTime?
  teamId      String

  // Relations
  team Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  // Metadata
  createdById String
  createdBy   User     @relation("CalendarEventCreator", fields: [createdById], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([teamId])
  @@index([startDate])
  @@index([createdById])
  @@map("events")
}
_HERE`;

  const blocks = useMemo(() => splitPrismaSchema(prismaSchema), [prismaSchema]);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4 bg-muted/30">
        <div className="font-semibold">
          {blocks.filter((b) => b.kind === "model").length} models détectés
        </div>
        <div className="text-sm text-muted-foreground">
          Un bloc par model (avec highlight + bouton copier).
        </div>
      </div>

      {/* Grid: one card per block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {blocks.map((b) => (
          <ModelCard
            key={`${b.kind}:${b.title}`}
            title={b.title}
            code={b.code}
          />
        ))}
      </div>
    </div>
  );
}
