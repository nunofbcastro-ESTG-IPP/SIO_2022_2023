// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy suppliers
  /*const supplier1 = await prisma.supplier.create({
    data: {
      id: 'S1',
      email: 'supplier1@test.com',
      name: 'supplier1',
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      id: 'S2',
      email: 'supplier2@test.com',
      name: 'supplier2',
    },
  });*/

  // create dummy products
  /*const products = await prisma.product.createMany({
    data: [
      { id: '1', type: 'C', description: 'Macbook', supplierId: supplier1.id },
      { id: '2', type: 'C', description: 'Iphone', supplierId: supplier1.id },
      { id: '3', type: 'C', description: 'MousePad', supplierId: supplier2.id },
    ],
  });

  console.log({ supplier1, supplier2, products });*/
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
