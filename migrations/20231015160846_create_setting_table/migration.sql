-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('enabled', 'disabled', 'within_working_hours');

-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "SettingType" NOT NULL,
    "workingHours" JSONB,
    "senderId" UUID NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_senderId_key" ON "Setting"("senderId");
