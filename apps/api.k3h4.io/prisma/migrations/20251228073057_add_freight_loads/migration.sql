-- CreateTable
CREATE TABLE "FreightLoad" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "originName" TEXT NOT NULL,
    "originLat" DOUBLE PRECISION NOT NULL,
    "originLng" DOUBLE PRECISION NOT NULL,
    "destinationName" TEXT NOT NULL,
    "destinationLat" DOUBLE PRECISION NOT NULL,
    "destinationLng" DOUBLE PRECISION NOT NULL,
    "distanceKm" DECIMAL(10,2) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "cost" DECIMAL(18,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planning',
    "routeGeoJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreightLoad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FreightLoad_userId_status_idx" ON "FreightLoad"("userId", "status");

-- AddForeignKey
ALTER TABLE "FreightLoad" ADD CONSTRAINT "FreightLoad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
