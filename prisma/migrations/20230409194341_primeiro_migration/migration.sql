-- CreateTable
CREATE TABLE `Accounts` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `isMasterAccount` BOOLEAN NOT NULL DEFAULT false,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `password` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NULL,

    UNIQUE INDEX `Accounts_email_key`(`email`),
    UNIQUE INDEX `Accounts_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Persons` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `employee` BOOLEAN NOT NULL DEFAULT false,
    `gender` VARCHAR(191) NOT NULL,
    `selfie` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Adresses` (
    `id` VARCHAR(191) NOT NULL,
    `adress` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `postalCode` INTEGER NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NULL,

    UNIQUE INDEX `Adresses_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categories_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `categoryId` VARCHAR(191) NULL,
    `personId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Products_categoryId_key`(`categoryId`),
    UNIQUE INDEX `Products_personId_key`(`personId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GeneralProductInfo` (
    `id` VARCHAR(191) NOT NULL,
    `adminId` VARCHAR(191) NOT NULL,
    `personId` VARCHAR(191) NOT NULL,
    `personName` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GeneralProductInfo_adminId_key`(`adminId`),
    UNIQUE INDEX `GeneralProductInfo_personId_key`(`personId`),
    UNIQUE INDEX `GeneralProductInfo_categoryId_key`(`categoryId`),
    UNIQUE INDEX `GeneralProductInfo_productId_key`(`productId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Adresses` ADD CONSTRAINT `Adresses_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneralProductInfo` ADD CONSTRAINT `GeneralProductInfo_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneralProductInfo` ADD CONSTRAINT `GeneralProductInfo_personId_fkey` FOREIGN KEY (`personId`) REFERENCES `Persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneralProductInfo` ADD CONSTRAINT `GeneralProductInfo_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneralProductInfo` ADD CONSTRAINT `GeneralProductInfo_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
