import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private _subcategoriesRepository: Repository<Subcategory>,
  ) {}

  getAllSubcategories() {
    return this._subcategoriesRepository.find({
      relations: ['category', 'products'],
    });
  }

  getSubcategoryById(id: number) {
    return this._subcategoriesRepository.findOne({
      relations: ['category', 'products'],
      where: {
        id,
      },
    });
  }
  createSubcategory(subcategory: CreateSubcategoryDto) {
    const newSubcategory = this._subcategoriesRepository.create(subcategory);
    return this._subcategoriesRepository.save(newSubcategory);
  }

  updateSubcategory(id: number, SubcategoryData: CreateSubcategoryDto) {
    const updatedSubcategory = this._subcategoriesRepository.find({
      where: {
        id,
      },
    });
    if (!updatedSubcategory) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this._subcategoriesRepository.update(id, SubcategoryData);
  }
}
