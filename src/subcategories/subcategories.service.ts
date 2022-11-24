import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { ProductsService } from 'src/products/products.service';
import { In, Repository } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService {
  constructor(
    @InjectRepository(Subcategory)
    private _subcategoriesRepository: Repository<Subcategory>,
    private _productsService: ProductsService, // private _categoriesService: CategoryService,
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

  getSubcategoriesById(id: Subcategory[]) {
    return this._subcategoriesRepository.find({
      relations: ['category', 'products'],
      where: {
        id: In([...id]),
      },
    });
  }

  async createSubcategory(subcategory: CreateSubcategoryDto) {
    const products = await this._productsService.getProductsById(
      subcategory.products,
    );
    // const category = await this._categoriesService.getCategoryById(
    //   subcategory.category,
    // );
    if (!products) new HttpException('Product not found', HttpStatus.NOT_FOUND);
    // if (!category)
    //   new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    const newSubcategory = this._subcategoriesRepository.create(subcategory);
    products.map((product) => newSubcategory.products.push(product));
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
