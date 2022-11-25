import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Brand } from './entity/brand.entity';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entity/category.entity';
import { ProductsService } from 'src/products/products.service';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { Products } from 'src/products/entity/products.entity';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Category, Products, Subcategory])],
  providers: [
    BrandService,
    CategoryService,
    ProductsService,
    SubcategoriesService,
  ],
  controllers: [BrandController],
})
export class BrandModule {}
