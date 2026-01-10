-- CreateTable
CREATE TABLE "AgricultureResourceCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureResourceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgricultureResource" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AgricultureResource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgricultureResourceCategory_slug_key" ON "AgricultureResourceCategory"("slug");

-- CreateIndex
CREATE INDEX "AgricultureResource_categoryId_idx" ON "AgricultureResource"("categoryId");

-- AddForeignKey
ALTER TABLE "AgricultureResource" ADD CONSTRAINT "AgricultureResource_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AgricultureResourceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

