/*
  Warnings:

  - You are about to drop the `breed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `AnimalType` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "breed";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Breed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AnimalType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);
INSERT INTO "new_AnimalType" ("id") SELECT "id" FROM "AnimalType";
DROP TABLE "AnimalType";
ALTER TABLE "new_AnimalType" RENAME TO "AnimalType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
