-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orgId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "notes" TEXT,
    "email" TEXT,
    "location" TEXT,
    "website" TEXT,
    "phone" TEXT,
    CONSTRAINT "Partner_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Partner" ("createdAt", "description", "email", "id", "img", "location", "name", "notes", "orgId", "phone", "tags", "updatedAt", "website") SELECT "createdAt", "description", "email", "id", "img", "location", "name", "notes", "orgId", "phone", "tags", "updatedAt", "website" FROM "Partner";
DROP TABLE "Partner";
ALTER TABLE "new_Partner" RENAME TO "Partner";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
