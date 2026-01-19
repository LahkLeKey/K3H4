-- CreateTable
CREATE TABLE "GeoStatusLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "status" TEXT NOT NULL,
    "poiStatus" TEXT,
    "centerLat" DECIMAL(11,6),
    "centerLng" DECIMAL(11,6),
    "error" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoStatusLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GeoStatusLog_createdAt_idx" ON "GeoStatusLog"("createdAt");

-- AddForeignKey
ALTER TABLE "GeoStatusLog" ADD CONSTRAINT "GeoStatusLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
