BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [numberPhone] INT,
    [avatar] NVARCHAR(1000),
    [isBlocked] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Family] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Family_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Family_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Supplier] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Supplier_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Purchase] (
    [id] NVARCHAR(1000) NOT NULL,
    [documentType] NVARCHAR(1000) NOT NULL,
    [supplierId] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [netTotal] DECIMAL(9,2) NOT NULL,
    [grossTotal] DECIMAL(9,2) NOT NULL,
    [deleted] BIT NOT NULL,
    CONSTRAINT [Purchase_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PurchaseLine] (
    [purchaseId] NVARCHAR(1000) NOT NULL,
    [itemId] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [unitPrice] DECIMAL(9,2) NOT NULL,
    [amount] DECIMAL(9,2) NOT NULL,
    [net_amount] DECIMAL(9,2) NOT NULL,
    [tax_amount] DECIMAL(9,2) NOT NULL,
    CONSTRAINT [PurchaseLine_pkey] PRIMARY KEY CLUSTERED ([purchaseId],[itemId])
);

-- CreateTable
CREATE TABLE [dbo].[Product] (
    [id] NVARCHAR(1000) NOT NULL,
    [productCode] NVARCHAR(1000) NOT NULL,
    [productType] NVARCHAR(1000) NOT NULL,
    [productGroup] NVARCHAR(1000) NOT NULL,
    [productDescription] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Product_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Product_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Product_productCode_key] UNIQUE NONCLUSTERED ([productCode])
);

-- CreateTable
CREATE TABLE [dbo].[Address] (
    [id] INT NOT NULL IDENTITY(1,1),
    [buildingNumber] NVARCHAR(1000),
    [streetName] NVARCHAR(1000),
    [addressDetail] NVARCHAR(1000) NOT NULL,
    [city] NVARCHAR(1000) NOT NULL,
    [postalCode] NVARCHAR(1000) NOT NULL,
    [region] NVARCHAR(1000),
    [country] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Address_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [id] NVARCHAR(1000) NOT NULL,
    [accountId] NVARCHAR(1000) NOT NULL,
    [customerTaxId] NVARCHAR(1000) NOT NULL,
    [companyName] NVARCHAR(1000) NOT NULL,
    [billingAddressId] INT NOT NULL,
    [selfBillingIndicator] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Customer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Invoice] (
    [id] NVARCHAR(1000) NOT NULL,
    [atcud] NVARCHAR(1000) NOT NULL,
    [invoiceStatus] NVARCHAR(1000) NOT NULL,
    [invoiceStatusDate] NVARCHAR(1000) NOT NULL,
    [sourceId] NVARCHAR(1000) NOT NULL,
    [sourceBilling] NVARCHAR(1000) NOT NULL,
    [hash] NVARCHAR(1000) NOT NULL,
    [hashControl] NVARCHAR(1000) NOT NULL,
    [period] NVARCHAR(1000) NOT NULL,
    [invoiceDate] DATETIME2 NOT NULL CONSTRAINT [Invoice_invoiceDate_df] DEFAULT CURRENT_TIMESTAMP,
    [invoiceType] NVARCHAR(1000) NOT NULL,
    [selfBillingIndicator] INT NOT NULL,
    [cashVatSchemeIndicator] INT NOT NULL,
    [thirdPartiesBillingIndicator] INT NOT NULL,
    [systemEntryDate] NVARCHAR(1000) NOT NULL,
    [customerId] NVARCHAR(1000) NOT NULL,
    [taxPayable] DECIMAL(9,2) NOT NULL,
    [netTotal] DECIMAL(9,2) NOT NULL,
    [grossTotal] DECIMAL(9,2) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Invoice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Invoice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[InvoiceLine] (
    [invoiceId] NVARCHAR(1000) NOT NULL,
    [lineNumber] INT NOT NULL,
    [productCode] NVARCHAR(1000) NOT NULL,
    [quantity] INT NOT NULL,
    [unitOfMeasure] NVARCHAR(1000) NOT NULL,
    [unitPrice] DECIMAL(9,2) NOT NULL,
    [taxPointDate] DATETIME2 NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [creditAmount] DECIMAL(9,2) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [InvoiceLine_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [taxTaxCode] NVARCHAR(1000),
    CONSTRAINT [InvoiceLine_pkey] PRIMARY KEY CLUSTERED ([invoiceId],[lineNumber])
);

-- CreateTable
CREATE TABLE [dbo].[Tax] (
    [taxCode] NVARCHAR(1000) NOT NULL,
    [taxType] NVARCHAR(1000) NOT NULL,
    [taxCountryRegion] NVARCHAR(1000) NOT NULL,
    [taxExpirationDate] DATETIME2 NOT NULL,
    [taxPercentage] INT NOT NULL,
    [taxAmount] DECIMAL(9,2) NOT NULL,
    [year] DATETIME2 NOT NULL,
    CONSTRAINT [Tax_pkey] PRIMARY KEY CLUSTERED ([taxCode])
);

-- CreateTable
CREATE TABLE [dbo].[TaxCode] (
    [taxCode] NVARCHAR(1000) NOT NULL,
    [taxDescription] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [TaxCode_pkey] PRIMARY KEY CLUSTERED ([taxCode])
);

-- AddForeignKey
ALTER TABLE [dbo].[Purchase] ADD CONSTRAINT [Purchase_supplierId_fkey] FOREIGN KEY ([supplierId]) REFERENCES [dbo].[Supplier]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PurchaseLine] ADD CONSTRAINT [PurchaseLine_purchaseId_fkey] FOREIGN KEY ([purchaseId]) REFERENCES [dbo].[Purchase]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [Customer_billingAddressId_fkey] FOREIGN KEY ([billingAddressId]) REFERENCES [dbo].[Address]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InvoiceLine] ADD CONSTRAINT [InvoiceLine_invoiceId_fkey] FOREIGN KEY ([invoiceId]) REFERENCES [dbo].[Invoice]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InvoiceLine] ADD CONSTRAINT [InvoiceLine_productCode_fkey] FOREIGN KEY ([productCode]) REFERENCES [dbo].[Product]([productCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InvoiceLine] ADD CONSTRAINT [InvoiceLine_taxTaxCode_fkey] FOREIGN KEY ([taxTaxCode]) REFERENCES [dbo].[Tax]([taxCode]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Tax] ADD CONSTRAINT [Tax_taxCode_fkey] FOREIGN KEY ([taxCode]) REFERENCES [dbo].[TaxCode]([taxCode]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
