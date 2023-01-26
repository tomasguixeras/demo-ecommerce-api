import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brand/entity/brand.entity';
import { Category } from 'src/category/entity/category.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private _productsService: Repository<Products>,
    @InjectRepository(Brand) private _brandService: Repository<Brand>,
    @InjectRepository(Category) private _categoryService: Repository<Category>,
    @InjectRepository(Subcategory)
    private _subcategoryService: Repository<Subcategory>,
  ) {}

  getAllProducts() {
    return this._productsService.find({
      relations: ['brand', 'subcategory', 'category'],
    });
  }

  getProductById(id: number) {
    return this._productsService.findOne({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id,
      },
    });
  }

  getProductsByIds(ids: number[]) {
    return this._productsService.find({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id: In([...ids]),
      },
    });
  }

  async createProduct(product: CreateProductDto) {
    const productBrand = await this._brandService.findOne({
      where: {
        id: product.brand,
      },
    });
    if (!productBrand)
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);

    const productCategory = await this._categoryService.findOne({
      where: {
        id: product.category,
      },
    });
    if (!productCategory)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    const productSubcategory = await this._subcategoryService.findOne({
      relations: ['category'],
      where: {
        id: product.subcategory,
      },
    });
    if (!productSubcategory)
      return new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);
    if (productSubcategory.category.id !== product.category) {
      return new HttpException(
        'Subcategory does not belong to the category',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!product.model || !product.price || !product.description)
      return new HttpException(
        'Required information is missing',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const newProduct = this._productsService.create(product);
    return this._productsService.save(newProduct);
  }

  updateProduct(id: number, dataProduct: CreateProductDto) {
    const updatedProduct = this._productsService.find({
      where: {
        id,
      },
    });
    if (!updatedProduct) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const updatedProductCategory = this._categoryService.findOne({
      where: {
        id: dataProduct.category,
      },
    });
    if (!updatedProductCategory)
      return new HttpException('Category not found', HttpStatus.NOT_FOUND);

    const updatedProductSubcategory = this._subcategoryService.findOne({
      where: {
        id: dataProduct.subcategory,
      },
    });
    if (!updatedProductSubcategory)
      return new HttpException('Subcategory not found', HttpStatus.NOT_FOUND);

    if (!dataProduct.model || !dataProduct.price || !dataProduct.description)
      return new HttpException(
        'Required information is missing',
        HttpStatus.NOT_ACCEPTABLE,
      );
    return this._productsService.update(id, dataProduct);
  }
}
