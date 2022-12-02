import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './entity/brand.entity';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { ProductsService } from 'src/products/products.service';
import { Products } from 'src/products/entity/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Products])],
  providers: [BrandService, ProductsService],
  controllers: [BrandController],
})
export class BrandModule {}
