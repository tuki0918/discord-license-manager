-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('enable', 'disabled');

-- CreateEnum
CREATE TYPE "RedeemLicenseStatus" AS ENUM ('enable', 'disabled');

-- CreateTable
CREATE TABLE "License" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "status" "LicenseStatus" NOT NULL DEFAULT 'enable',
    "expired_at" TIMESTAMP(3) NOT NULL,
    "discord_grant_role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeemLicense" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "redeemed_at" TIMESTAMP(3) NOT NULL,
    "status" "RedeemLicenseStatus" NOT NULL DEFAULT 'enable',
    "discord_id" TEXT NOT NULL,
    "discord_grant_role_id" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RedeemLicense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_code_key" ON "License"("code");

-- CreateIndex
CREATE UNIQUE INDEX "RedeemLicense_code_discord_id_key" ON "RedeemLicense"("code", "discord_id");

-- AddForeignKey
ALTER TABLE "RedeemLicense" ADD CONSTRAINT "RedeemLicense_code_fkey" FOREIGN KEY ("code") REFERENCES "License"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
