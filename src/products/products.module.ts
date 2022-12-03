import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from 'src/brand/brand.service';
import { Brand } from 'src/brand/entity/brand.entity';
import { Category } from 'src/category/entity/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

import { Products } from './entity/products.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Brand, Subcategory, Category])],
  controllers: [ProductsController],
  providers: [ProductsService, BrandService],
})
export class ProductsModule {}
