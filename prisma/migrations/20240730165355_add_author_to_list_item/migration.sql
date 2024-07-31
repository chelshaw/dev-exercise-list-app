/*
  Warnings:

  - Added the required column `authorId` to the `ListItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN     "authorId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ListItem_authorId_idx" ON "ListItem"("authorId");
