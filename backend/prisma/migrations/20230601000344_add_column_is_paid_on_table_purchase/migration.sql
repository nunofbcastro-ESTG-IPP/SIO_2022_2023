/*
  Warnings:

  - You are about to drop the column `deleted` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `isDeleted` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPaid` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Purchase] DROP COLUMN [deleted];
ALTER TABLE [dbo].[Purchase] ADD [isDeleted] BIT NOT NULL,
[isPaid] BIT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
