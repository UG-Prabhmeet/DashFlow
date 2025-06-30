-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
