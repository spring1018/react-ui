/*
  Warnings:

  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("created_at", "id", "name", "role", "updated_at") SELECT "created_at", "id", "name", "role", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
