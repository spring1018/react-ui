/*
  Warnings:

  - Made the column `projectId` on table `tasks` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "start" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "projectId" TEXT NOT NULL,
    "parentTaskId" TEXT,
    CONSTRAINT "tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_parentTaskId_fkey" FOREIGN KEY ("parentTaskId") REFERENCES "tasks" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_tasks" ("end", "id", "level", "progress", "projectId", "start", "title", "type") SELECT "end", "id", "level", "progress", "projectId", "start", "title", "type" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
