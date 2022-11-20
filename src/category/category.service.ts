import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoriesService: Repository<Category>,
  ) {}

  getAllCategories() {
    return this._categoriesService.find();
  }

  getCategoriesById(id: number) {
    return this._categoriesService.findOne({
      where: {
        id,
      },
    });
  }

  createCategory(category: CategoryDto) {
    const newCategory = this._categoriesService.create(category);
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
