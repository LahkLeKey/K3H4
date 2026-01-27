-- CreateTable
CREATE TABLE "GeoDirection" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "provider" TEXT NOT NULL,
    "profile" TEXT,
    "signature" TEXT NOT NULL,
    "inputPoints" JSONB,
    "originLat" DECIMAL(11,6),
    "originLng" DECIMAL(11,6),
    "destinationLat" DECIMAL(11,6),
    "destinationLng" DECIMAL(11,6),
    "distanceMeters" DECIMAL(14,3),
    "durationSeconds" INTEGER,
    "geometry" JSONB,
    "instructions" JSONB,
    "payload" JSONB,
    "statusCode" INTEGER,
    "statusMessage" TEXT,
    "expiresAt" TIMESTAMP(3),
    "routeCacheId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeoDirection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoDirectionStop" (
    "id" TEXT NOT NULL,
    "directionId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "latitude" DECIMAL(11,6) NOT NULL,
    "longitude" DECIMAL(11,6) NOT NULL,
    "label" TEXT,
    "address" TEXT,
    "source" TEXT,
    "osmId" BIGINT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoDirectionStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeoDirectionSegment" (
    "id" TEXT NOT NULL,
    "directionId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "instruction" TEXT,
    "maneuverType" TEXT,
    "maneuverModifier" TEXT,
    "distanceMeters" DECIMAL(14,3) NOT NULL,
    "durationSeconds" INTEGER,
    "startLat" DECIMAL(11,6) NOT NULL,
    "startLng" DECIMAL(11,6) NOT NULL,
    "endLat" DECIMAL(11,6) NOT NULL,
    "endLng" DECIMAL(11,6) NOT NULL,
    "geometry" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeoDirectionSegment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeoDirection_signature_key" ON "GeoDirection"("signature");

-- CreateIndex
CREATE INDEX "GeoDirection_provider_expiresAt_idx" ON "GeoDirection"("provider", "expiresAt");

-- CreateIndex
CREATE INDEX "GeoDirectionStop_directionId_sequence_idx" ON "GeoDirectionStop"("directionId", "sequence");

-- CreateIndex
CREATE INDEX "GeoDirectionSegment_directionId_sequence_idx" ON "GeoDirectionSegment"("directionId", "sequence");

-- AddForeignKey
ALTER TABLE "GeoDirection" ADD CONSTRAINT "GeoDirection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoDirection" ADD CONSTRAINT "GeoDirection_routeCacheId_fkey" FOREIGN KEY ("routeCacheId") REFERENCES "GeoRouteCache"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoDirectionStop" ADD CONSTRAINT "GeoDirectionStop_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "GeoDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeoDirectionSegment" ADD CONSTRAINT "GeoDirectionSegment_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "GeoDirection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
