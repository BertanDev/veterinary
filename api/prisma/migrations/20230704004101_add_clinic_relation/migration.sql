/*
  Warnings:

  - Added the required column `clinic_id` to the `Vaccine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `Breed` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `Vet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `AnimalType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `WalletType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clinic_id` to the `Responsible` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vaccine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "animal_id" TEXT NOT NULL,
    "validate" DATETIME NOT NULL,
    "ml" REAL NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "Vaccine_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vaccine_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vaccine" ("animal_id", "id", "ml", "name", "validate") SELECT "animal_id", "id", "ml", "name", "validate" FROM "Vaccine";
DROP TABLE "Vaccine";
ALTER TABLE "new_Vaccine" RENAME TO "Vaccine";
CREATE TABLE "new_Breed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "Breed_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Breed" ("description", "id") SELECT "description", "id" FROM "Breed";
DROP TABLE "Breed";
ALTER TABLE "new_Breed" RENAME TO "Breed";
CREATE TABLE "new_Vet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "Vet_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vet" ("birth_date", "cpf", "email", "id", "name", "phone") SELECT "birth_date", "cpf", "email", "id", "name", "phone" FROM "Vet";
DROP TABLE "Vet";
ALTER TABLE "new_Vet" RENAME TO "Vet";
CREATE UNIQUE INDEX "Vet_email_key" ON "Vet"("email");
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "animal_type_id" TEXT NOT NULL,
    "breed_id" TEXT NOT NULL,
    "responsible_id" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "Animal_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_responsible_id_fkey" FOREIGN KEY ("responsible_id") REFERENCES "Responsible" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_breed_id_fkey" FOREIGN KEY ("breed_id") REFERENCES "Breed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_animal_type_id_fkey" FOREIGN KEY ("animal_type_id") REFERENCES "AnimalType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("animal_type_id", "breed_id", "height", "id", "name", "responsible_id", "weight") SELECT "animal_type_id", "breed_id", "height", "id", "name", "responsible_id", "weight" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_AnimalType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "AnimalType_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AnimalType" ("description", "id") SELECT "description", "id" FROM "AnimalType";
DROP TABLE "AnimalType";
ALTER TABLE "new_AnimalType" RENAME TO "AnimalType";
CREATE TABLE "new_WalletType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "WalletType_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_WalletType" ("description", "id") SELECT "description", "id" FROM "WalletType";
DROP TABLE "WalletType";
ALTER TABLE "new_WalletType" RENAME TO "WalletType";
CREATE TABLE "new_Responsible" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "clinic_id" TEXT NOT NULL,
    CONSTRAINT "Responsible_clinic_id_fkey" FOREIGN KEY ("clinic_id") REFERENCES "Clinic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Responsible" ("birth_date", "cpf", "email", "id", "name", "phone") SELECT "birth_date", "cpf", "email", "id", "name", "phone" FROM "Responsible";
DROP TABLE "Responsible";
ALTER TABLE "new_Responsible" RENAME TO "Responsible";
CREATE UNIQUE INDEX "Responsible_email_key" ON "Responsible"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
