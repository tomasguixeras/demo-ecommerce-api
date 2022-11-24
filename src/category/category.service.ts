import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { SubcategoriesService } from 'src/subcategories/subcategories.service';
import { In, Repository } from 'typeorm';

import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoriesService: Repository<Category>,
    private _productsService: ProductsService,
    private _subcategoriesService: SubcategoriesService,
  ) {}

  getAllCategories() {
    return this._categoriesService.find({
      relations: ['subcategory', 'products'],
    });
  }

  getCategoryById(id: Category['id']) {
    return this._categoriesService.findOne({
      relations: ['subcategory', 'products'],
      where: {
        id: id,
      },
    });
  }

  getCategoriesById(id: Category[]) {
    return this._categoriesService.find({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id: In([...id]),
      },
    });
  }

  async createCategory(category: CategoryDto) {
    const products = await this._productsService.getProductsById(
      category.products,
    );
    const subcategories = await this._subcategoriesService.getSubcategoriesById(
      category.subcategory,
    );
    if (!products) new HttpException('Product not found', HttpStatus.NOT_FOUND);
    if (!subcategories)
      new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    const newCategory = this._categoriesService.create(category);
    products.map((product) => newCategory.products.push(product));
    subcategories.map((subcategory) =>
      newCategory.subcategory.push(subcategory),
    );
    return this._categoriesService.save(newCategory);
  }

  updateCategory(id: number, dataCategory: CategoryDto) {
    const updatedProduct = this._categoriesService.find({
      where: {
        id,
      },
    });
    if (!updatedProduct) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this._categoriesService.update(id, dataCategory);
  }
}
