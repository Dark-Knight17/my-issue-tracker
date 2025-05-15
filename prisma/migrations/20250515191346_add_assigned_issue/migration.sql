-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assigedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigedToUserId_fkey` FOREIGN KEY (`assigedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
