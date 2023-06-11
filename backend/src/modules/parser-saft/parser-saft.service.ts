import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { PrismaService } from '@/database/prisma.service';
import { OptionsV2, Parser } from 'xml2js';

import {
  getAllFamilies,
  getAllPayments,
  getAllProducts,
  getAllPurchases,
  getAllSuppliers,
} from '@/common/services/api/requests/TocOnlineApi';

import { Supplier } from '@/common/models/Supplier';
import { Family } from '@/common/models/Family';
import { Purchase } from '@/common/models/Purchase';
import { Payment } from '@/common/models/Payment';
import { Product } from '@/common/models/Product';

@Injectable()
export class ParserSaftService {
  constructor(private readonly prisma: PrismaService) {}

  private stringToDate(dateString: string) {
    var dateParts = dateString.split('-');
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]) - 1; // Os meses em JavaScript são baseados em zero
    var day = parseInt(dateParts[2]);

    return new Date(year, month, day);
  }

  async parseSaftFile(xmlContent: string): Promise<any> {
    const parser = new Parser({
      explicitArray: false,
      ignoreAttrs: true,
    } as OptionsV2);

    const parsedData: any = await parser.parseStringPromise(xmlContent);

    await this.createSuppliers();
    await this.createFamilies();
    await this.createProducts();
    await this.createPurchase();
    await this.createCustomers(parsedData.AuditFile.MasterFiles.Customer);
    await this.createInvoices(
      parsedData.AuditFile.SourceDocuments.SalesInvoices.Invoice,
    );
  }

  private isDeletedPurchases(
    payments: Payment[],
    payments_ids?: number[],
  ): boolean {
    if (!payments_ids) {
      return false;
    }
    for (const id of payments_ids) {
      const payment = payments.find((payment) => payment.id == id);

      if (payment.deleted) {
        return true;
      }
    }
    return false;
  }

  async createPurchase() {
    const payments: Payment[] = await getAllPayments();
    const purchases: Purchase[] = await getAllPurchases();

    for (const purchase of purchases) {
      await this.prisma.purchase.upsert({
        where: { id: purchase.document_no },
        create: {
          id: purchase.document_no,
          documentType: purchase.document_type,
          supplierId: `${purchase.supplier_id}`,
          date: this.stringToDate(purchase.date),
          netTotal: purchase.net_total,
          grossTotal: purchase.gross_total,
          isDeleted: this.isDeletedPurchases(payments, purchase.payments_ids),
          isPaid: purchase.payments_ids != null,
        },
        update: {
          documentType: purchase.document_type,
          supplierId: `${purchase.supplier_id}`,
          date: this.stringToDate(purchase.date),
          netTotal: purchase.net_total,
          grossTotal: purchase.gross_total,
          isDeleted: this.isDeletedPurchases(payments, purchase.payments_ids),
          isPaid: purchase.payments_ids != null,
        },
      });

      for (const line of purchase.lines) {
        await this.prisma.purchaseLine.upsert({
          where: {
            purchaseId_itemId: {
              purchaseId: purchase.document_no,
              itemId: `${line.item_id}`,
            },
          },
          create: {
            purchaseId: purchase.document_no,
            itemId: `${line.item_id}`,
            quantity: line.quantity,
            unitPrice: line.unit_price,
            amount: line.amount,
            net_amount: line.net_amount,
            tax_amount: line.tax_amount,
          },
          update: {
            quantity: line.quantity,
            unitPrice: line.unit_price,
            amount: line.amount,
            net_amount: line.net_amount,
            tax_amount: line.tax_amount,
          },
        });
      }
    }
  }

  async createSuppliers() {
    const suppliers: Supplier[] = await getAllSuppliers();
    for (const supplier of suppliers) {
      await this.prisma.supplier.upsert({
        where: { id: supplier.id },
        create: {
          id: supplier.id,
          name: supplier.attributes.business_name,
        },
        update: {
          name: supplier.attributes.business_name,
        },
      });
    }
  }

  async createFamilies() {
    const families: Family[] = await getAllFamilies();
    for (const family of families) {
      await this.prisma.family.upsert({
        where: { id: family.id },
        create: {
          id: family.id,
          name: family.attributes.name,
        },
        update: {
          name: family.attributes.name,
        },
      });
    }
  }

  async createCustomers(customers) {
    for (const customer of customers) {
      const billingAddress = customer.BillingAddress;
      const billing = await this.prisma.address.create({
        data: {
          addressDetail: billingAddress.AddressDetail,
          city: billingAddress.City,
          postalCode: billingAddress.PostalCode,
          country: billingAddress.Country,
        },
      });

      await this.prisma.customer.upsert({
        where: {
          id: customer.CustomerID,
        },
        create: {
          id: customer.CustomerID,
          accountId: customer.AccountID,
          companyName: customer.CompanyName,
          customerTaxId: customer.CustomerTaxID,
          billingAddressId: billing.id,
          selfBillingIndicator: parseInt(customer.SelfBillingIndicator),
        },
        update: {
          accountId: customer.AccountID,
          companyName: customer.CompanyName,
          customerTaxId: customer.CustomerTaxID,
          billingAddressId: billing.id,
          selfBillingIndicator: parseInt(customer.SelfBillingIndicator),
        },
      });
    }
  }

  async createProducts() {
    const products: Product[] = await getAllProducts();
    for (const product of products) {
      await this.prisma.product.upsert({
        where: {
          id: product.id,
        },
        create: {
          id: product.id,
          productCode: product.attributes.item_code,
          productType: product.type,
          productGroup: product.relationships.item_families.data.id,
          productDescription: product.attributes.item_description,
        },
        update: {
          productCode: product.attributes.item_code,
          productType: product.type,
          productGroup: product.relationships.item_families.data.id,
          productDescription: product.attributes.item_description,
        },
      });
    }
  }

  async createInvoices(invoices) {
    for (const invoice of invoices) {
      try {
        const invoiceLines = Array.isArray(invoice.Line)
          ? invoice.Line
          : [invoice.Line];

        await this.prisma.invoice.upsert({
          where: {
            id: invoice.InvoiceNo,
          },
          create: {
            id: invoice.InvoiceNo,
            atcud: invoice.ATCUD,
            invoiceStatus: invoice.DocumentStatus.InvoiceStatus,
            invoiceStatusDate: invoice.DocumentStatus.InvoiceStatusDate,
            sourceId: invoice.DocumentStatus.SourceID,
            sourceBilling: invoice.DocumentStatus.SourceBilling,
            hash: invoice.Hash,
            hashControl: invoice.HashControl,
            period: invoice.Period,
            invoiceDate: new Date(invoice.InvoiceDate),
            invoiceType: invoice.InvoiceType,
            selfBillingIndicator: parseInt(
              invoice.SpecialRegimes.SelfBillingIndicator,
            ),
            cashVatSchemeIndicator: 0,
            thirdPartiesBillingIndicator: parseInt(
              invoice.SpecialRegimes.ThirdPartiesBillingIndicator,
            ),
            systemEntryDate: invoice.SystemEntryDate,
            customerId: invoice.CustomerID,
            taxPayable: invoice.DocumentTotals.TaxPayable,
            netTotal: invoice.DocumentTotals.NetTotal,
            grossTotal: invoice.DocumentTotals.GrossTotal,
          },
          update: {
            atcud: invoice.ATCUD,
            invoiceStatus: invoice.DocumentStatus.InvoiceStatus,
            invoiceStatusDate: invoice.DocumentStatus.InvoiceStatusDate,
            sourceId: invoice.DocumentStatus.SourceID,
            sourceBilling: invoice.DocumentStatus.SourceBilling,
            hash: invoice.Hash,
            hashControl: invoice.HashControl,
            period: invoice.Period,
            invoiceDate: new Date(invoice.InvoiceDate),
            invoiceType: invoice.InvoiceType,
            selfBillingIndicator: parseInt(
              invoice.SpecialRegimes.SelfBillingIndicator,
            ),
            cashVatSchemeIndicator: 0,
            thirdPartiesBillingIndicator: parseInt(
              invoice.SpecialRegimes.ThirdPartiesBillingIndicator,
            ),
            systemEntryDate: invoice.SystemEntryDate,
            customerId: invoice.CustomerID,
            taxPayable: invoice.DocumentTotals.TaxPayable,
            netTotal: invoice.DocumentTotals.NetTotal,
            grossTotal: invoice.DocumentTotals.GrossTotal,
          },
        });

        for (const invoiceLine of invoiceLines) {
          await this.prisma.invoiceLine.upsert({
            where: {
              invoiceId_lineNumber: {
                invoiceId: invoice.InvoiceNo,
                lineNumber: parseInt(invoiceLine.LineNumber),
              },
            },
            create: {
              invoiceId: invoice.InvoiceNo,
              lineNumber: parseInt(invoiceLine.LineNumber),
              productCode: invoiceLine.ProductCode,
              quantity: parseInt(invoiceLine.Quantity),
              unitOfMeasure: invoiceLine.UnitOfMeasure,
              unitPrice: invoiceLine.UnitPrice,
              taxPointDate: new Date(invoiceLine.TaxPointDate),
              description: invoiceLine.Description,
              creditAmount: invoiceLine.CreditAmount,
            },
            update: {
              productCode: invoiceLine.ProductCode,
              quantity: parseInt(invoiceLine.Quantity),
              unitOfMeasure: invoiceLine.UnitOfMeasure,
              unitPrice: invoiceLine.UnitPrice,
              taxPointDate: new Date(invoiceLine.TaxPointDate),
              description: invoiceLine.Description,
              creditAmount: invoiceLine.CreditAmount,
            },
          });
        }
      } catch (error) {}
    }
  }
}
