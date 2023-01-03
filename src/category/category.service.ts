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
    return this._categoriesService.find({});
  }

  getCategoryById(id: Category['id']) {
    return this._categoriesService.findOne({
      where: {
        id: id,
      },
    });
  }

  async createCategory(category: CategoryDto) {
    if (!category.name)
      return new HttpException('Name is required', HttpStatus.NOT_FOUND);
    const newCategory = this._categoriesService.create(category);
    return this._categoriesService.save(newCategory);
  }

  async updateCategory(id: number, category: CategoryDto) {
    const categoryToUpdate = await this.getCategoryById(id);
    if (!categoryToUpdate) {
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return this._categoriesService.update(id, category);
  }
}
