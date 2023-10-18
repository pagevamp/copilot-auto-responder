-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('ENABLED', 'DISABLED', 'WITHIN_WORKING_HOURS');

-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "SettingType" NOT NULL,
    "timezone" TEXT,
    "workingHours" JSONB,
    "createdById" UUID NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_createdById_key" ON "Setting"("createdById");
