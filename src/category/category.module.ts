import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entity/category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Products } from 'src/products/entity/products.entity';
import { ProductsService } from 'src/products/products.service';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { Brand } from 'src/brand/entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Products, Subcategory, Brand])],
  providers: [CategoryService, ProductsService, SubcategoriesService],
  controllers: [CategoryController],
})
export class CategoryModule {}
