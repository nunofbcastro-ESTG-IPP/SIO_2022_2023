import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaException } from './common/exceptions/prisma.exception';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SalesModule } from './modules/sales/sales.module';
import { ProductsModule } from './modules/products/products.module';
import { ParserSaftModule } from './modules/parser-saft/parser-saft.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV == undefined ? '' : `.${process.env.NODE_ENV}`
      }`,
    }),
    PrismaModule,
    AuthModule,
    SuppliersModule,
    ClientsModule,
    SalesModule,
    ProductsModule,
    ParserSaftModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaException,
    },
  ],
})
export class AppModule {}
