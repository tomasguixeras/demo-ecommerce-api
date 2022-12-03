import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entity/products.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { In, Repository } from 'typeorm';

import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoriesService: Repository<Category>,
    @InjectRepository(Products) private _productsService: Repository<Products>,
    @InjectRepository(Subcategory)
    private _subcategoriesService: Repository<Subcategory>,
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
    const products = await this._productsService.find({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id: In([...category.products]),
      },
    });
    const subcategories = await this._subcategoriesService.find({
      relations: ['category', 'products'],
      where: {
        id: In([...category.subcategory]),
      },
    });
    if (products.length !== category.products.length)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    if (subcategories.length !== category.subcategory.length)
      return new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    const newCategory = this._categoriesService.create({
      name: category.name,
      products: products,
      subcategory: subcategories,
    });
    return this._categoriesService.save(newCategory);
  }

  async updateCategory(id: number, category: CategoryDto) {
    const categoryToUpdate = await this.getCategoryById(id);
    let productsOfCategory;
    let subcategoriesOfCategory;
    if (!categoryToUpdate) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    if (category.products) {
      productsOfCategory = await this._productsService.find({
        relations: ['brand', 'subcategory', 'category'],
        where: {
          id: In([...category.products]),
        },
      });
      if (productsOfCategory.length !== category.products.length)
        return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    if (category.subcategory) {
      subcategoriesOfCategory = await this._subcategoriesService.find({
        relations: ['category', 'products'],
        where: {
          id: In([...category.subcategory]),
        },
      });
      if (subcategoriesOfCategory.length !== category.products.length)
        return new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(categoryToUpdate, {
      name: category.name && category.name,
      image: category.image && category.image,
      status: category.status && category.status,
      products: category.products && productsOfCategory,
      subcategory: category.subcategory && subcategoriesOfCategory,
    });
    this._categoriesService.save(categoryToUpdate);
  }
}
