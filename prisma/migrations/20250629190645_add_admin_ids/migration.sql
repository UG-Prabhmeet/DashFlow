-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "adminIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
