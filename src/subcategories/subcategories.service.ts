import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private _subcategoriesRepository: Repository<Subcategory>,
    @InjectRepository(Category)
    private _categoriesRepository: Repository<Category>,
  ) {}

  getAllSubcategories() {
    return this._subcategoriesRepository.find({
      relations: ['category'],
    });
  }

  getSubcategoryById(id: number) {
    return this._subcategoriesRepository.findOne({
      relations: ['category'],
      where: {
        id,
      },
    });
  }

  async createSubcategory(subcategory: CreateSubcategoryDto) {
    const category = await this._categoriesRepository.findOne({
      where: {
        id: subcategory.categoryId,
      },
    });

    if (!category)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);
    if (!subcategory.name)
      return new HttpException('Name is required', HttpStatus.NOT_ACCEPTABLE);
    const newSubcategory = this._subcategoriesRepository.create(subcategory);
    return this._subcategoriesRepository.save(newSubcategory);
  }

  async updateSubcategory(id: number, subcategoryData: CreateSubcategoryDto) {
    const updatedSubcategory = await this._subcategoriesRepository.find({
      where: {
        id,
      },
    });

    if (subcategoryData.categoryId)
      return new HttpException(
        'CategoryId in Subcategory update is not acceptable',
        HttpStatus.NOT_ACCEPTABLE,
      );
    if (!updatedSubcategory) {
      return new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    }
    return this._subcategoriesRepository.update(id, subcategoryData);
  }
}
