-- Create staffing engagement and workforce planning tables
CREATE TABLE "StaffingEngagement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "client" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DECIMAL(18, 2),
    "forecast" DECIMAL(18, 2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffingEngagement_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StaffingRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "engagementId" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "modality" TEXT,
    "openings" INTEGER NOT NULL DEFAULT 1,
    "filled" INTEGER NOT NULL DEFAULT 0,
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "status" TEXT NOT NULL DEFAULT 'open',
    "rateMin" DECIMAL(18, 2),
    "rateMax" DECIMAL(18, 2),
    "billRate" DECIMAL(18, 2),
    "payRate" DECIMAL(18, 2),
    "tags" TEXT,
    "skills" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffingRole_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StaffingCandidate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "engagementId" TEXT,
    "roleId" TEXT,
    "personaId" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "source" TEXT,
    "stage" TEXT NOT NULL DEFAULT 'prospect',
    "score" DECIMAL(5, 2),
    "desiredRate" DECIMAL(18, 2),
    "availability" TEXT,
    "location" TEXT,
    "note" TEXT,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffingCandidate_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StaffingShift" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "coverageStatus" TEXT NOT NULL DEFAULT 'unfilled',
    "assignedPersonaId" TEXT,
    "assignedCandidateId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffingShift_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StaffingPlacement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "engagementId" TEXT,
    "roleId" TEXT,
    "candidateId" TEXT,
    "personaId" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "billRate" DECIMAL(18, 2),
    "payRate" DECIMAL(18, 2),
    "margin" DECIMAL(18, 2),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffingPlacement_pkey" PRIMARY KEY ("id")
);

-- Indexes to keep queries fast
CREATE INDEX "StaffingEngagement_userId_status_idx" ON "StaffingEngagement"("userId", "status");
CREATE INDEX "StaffingRole_userId_status_idx" ON "StaffingRole"("userId", "status");
CREATE INDEX "StaffingCandidate_userId_stage_idx" ON "StaffingCandidate"("userId", "stage");
CREATE INDEX "StaffingShift_userId_status_idx" ON "StaffingShift"("userId", "status");
CREATE INDEX "StaffingPlacement_userId_status_idx" ON "StaffingPlacement"("userId", "status");

-- Foreign keys
ALTER TABLE "StaffingEngagement" ADD CONSTRAINT "StaffingEngagement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "StaffingRole" ADD CONSTRAINT "StaffingRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StaffingRole" ADD CONSTRAINT "StaffingRole_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "StaffingEngagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "StaffingCandidate" ADD CONSTRAINT "StaffingCandidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StaffingCandidate" ADD CONSTRAINT "StaffingCandidate_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "StaffingEngagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingCandidate" ADD CONSTRAINT "StaffingCandidate_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "StaffingRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingCandidate" ADD CONSTRAINT "StaffingCandidate_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "StaffingShift" ADD CONSTRAINT "StaffingShift_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StaffingShift" ADD CONSTRAINT "StaffingShift_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "StaffingRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingShift" ADD CONSTRAINT "StaffingShift_assignedPersonaId_fkey" FOREIGN KEY ("assignedPersonaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingShift" ADD CONSTRAINT "StaffingShift_assignedCandidateId_fkey" FOREIGN KEY ("assignedCandidateId") REFERENCES "StaffingCandidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "StaffingPlacement" ADD CONSTRAINT "StaffingPlacement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StaffingPlacement" ADD CONSTRAINT "StaffingPlacement_engagementId_fkey" FOREIGN KEY ("engagementId") REFERENCES "StaffingEngagement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingPlacement" ADD CONSTRAINT "StaffingPlacement_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "StaffingRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingPlacement" ADD CONSTRAINT "StaffingPlacement_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "StaffingCandidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "StaffingPlacement" ADD CONSTRAINT "StaffingPlacement_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona"("id") ON DELETE SET NULL ON UPDATE CASCADE;
