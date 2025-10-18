-- CreateTable
CREATE TABLE "Concept" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'idea',
    "createdBy" TEXT NOT NULL DEFAULT 'anonymous',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Relationship" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceConceptId" TEXT NOT NULL,
    "targetConceptId" TEXT NOT NULL,
    "relationshipType" TEXT NOT NULL,
    "description" TEXT,
    "createdBy" TEXT NOT NULL DEFAULT 'anonymous',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Relationship_sourceConceptId_fkey" FOREIGN KEY ("sourceConceptId") REFERENCES "Concept" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Relationship_targetConceptId_fkey" FOREIGN KEY ("targetConceptId") REFERENCES "Concept" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Concept_type_idx" ON "Concept"("type");

-- CreateIndex
CREATE INDEX "Concept_createdAt_idx" ON "Concept"("createdAt");

-- CreateIndex
CREATE INDEX "Relationship_sourceConceptId_idx" ON "Relationship"("sourceConceptId");

-- CreateIndex
CREATE INDEX "Relationship_targetConceptId_idx" ON "Relationship"("targetConceptId");

-- CreateIndex
CREATE INDEX "Relationship_relationshipType_idx" ON "Relationship"("relationshipType");
