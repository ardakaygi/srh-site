-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plateCode" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "leadTimeLabel" TEXT NOT NULL,
    "regionalIntro" TEXT NOT NULL,
    "topBrandSlugs" TEXT NOT NULL,
    "faqJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "faultsJson" TEXT NOT NULL,
    "faqJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "suctionPa" INTEGER,
    "batteryMah" INTEGER,
    "runtimeMin" INTEGER,
    "commonIssues" TEXT NOT NULL,
    "partsNote" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trackingCode" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "modelName" TEXT,
    "faultDescription" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "addressLine" TEXT NOT NULL,
    "kvkkConsent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'RECEIVED',
    "carrierName" TEXT,
    "carrierTrackingUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ServiceRequest_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ServiceRequest_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceRequestStatusEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceRequestId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServiceRequestStatusEvent_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "ServiceRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_slug_key" ON "Province"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Province_plateCode_key" ON "Province"("plateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Model_brandId_slug_key" ON "Model"("brandId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceRequest_trackingCode_key" ON "ServiceRequest"("trackingCode");
