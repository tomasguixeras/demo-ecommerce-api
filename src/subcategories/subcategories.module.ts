import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesController } from './subcategories.controller';
import { Category } from 'src/category/entity/category.entity';
import { Products } from 'src/products/entity/products.entity';
import { ProductsService } from 'src/products/products.service';
import { CategoryService } from 'src/category/category.service';
import { BrandService } from 'src/brand/brand.service';
import { Brand } from 'src/brand/entity/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory, Category, Products, Brand])],
  controllers: [SubcategoriesController],
  providers: [
    SubcategoriesService,
    ProductsService,
    CategoryService,
    BrandService,
  ],
})
export class SubcategoriesModule {}
