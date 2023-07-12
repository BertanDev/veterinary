/*
  Warnings:

  - Added the required column `animal_type_id` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breed_id` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible_id` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `Responsible` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Vet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vaccine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "validate" DATETIME NOT NULL,
    "ml" REAL NOT NULL,
    CONSTRAINT "Vaccine_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "animal_type_id" TEXT NOT NULL,
    "breed_id" TEXT NOT NULL,
    "responsible_id" TEXT NOT NULL,
    CONSTRAINT "Animal_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "Responsible" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_animal_type_id_fkey" FOREIGN KEY ("animal_type_id") REFERENCES "AnimalType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("id") SELECT "id" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Responsible" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL
);
INSERT INTO "new_Responsible" ("cpf", "email", "id", "name", "phone") SELECT "cpf", "email", "id", "name", "phone" FROM "Responsible";
DROP TABLE "Responsible";
ALTER TABLE "new_Responsible" RENAME TO "Responsible";
CREATE UNIQUE INDEX "Responsible_email_key" ON "Responsible"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Vet_email_key" ON "Vet"("email");
