-- CreateTable
CREATE TABLE "GeoViewHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "zoomBand" INTEGER NOT NULL,
    "bboxMinLat" DECIMAL(11,6) NOT NULL,
    "bboxMinLng" DECIMAL(11,6) NOT NULL,
    "bboxMaxLat" DECIMAL(11,6) NOT NULL,
    "bboxMaxLng" DECIMAL(11,6) NOT NULL,
    "lastPoiIds" JSONB,
    "lastPoiCount" INTEGER,
    "firstViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER NOT NULL DEFAULT 1,
    "staleAfter" TIMESTAMP(3),

    CONSTRAINT "GeoViewHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeoViewHistory_userId_lastViewedAt_idx" ON "GeoViewHistory"("userId", "lastViewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "GeoViewHistory_userId_signature_key" ON "GeoViewHistory"("userId", "signature");

-- AddForeignKey
ALTER TABLE "GeoViewHistory" ADD CONSTRAINT "GeoViewHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
