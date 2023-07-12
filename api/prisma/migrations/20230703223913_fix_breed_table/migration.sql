/*
  Warnings:

  - You are about to drop the `Breed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Breed";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "breed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);
