/*
  Warnings:

  - Added the required column `password` to the `Clinic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Clinic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL
);
INSERT INTO "new_Clinic" ("cidade", "cnpj", "email", "endereco", "id", "nome", "uf") SELECT "cidade", "cnpj", "email", "endereco", "id", "nome", "uf" FROM "Clinic";
DROP TABLE "Clinic";
ALTER TABLE "new_Clinic" RENAME TO "Clinic";
CREATE UNIQUE INDEX "Clinic_email_key" ON "Clinic"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
