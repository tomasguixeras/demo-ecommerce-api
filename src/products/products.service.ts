import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/brand/entity/brand.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private _productsService: Repository<Products>,
    @InjectRepository(Brand) private _brandService: Repository<Brand>,
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

  getProductsById(id: Products[]) {
    return this._productsService.find({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id: In([...id]),
      },
    });
  }

  createProduct(product: CreateProductDto) {
    const productBrand = this._brandService.findOne({
      relations: ['products'],
      where: {
        id: product.brandId,
      },
    });
    if (!productBrand)
      new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    const newProduct = this._productsService.create(product);
    return this._productsService.save(newProduct);
  }

  updateProduct(id: number, dataProduct: Products) {
    const updatedProduct = this._productsService.find({
      where: {
        id,
      },
    });
    if (!updatedProduct) {
      return new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return this._productsService.update(id, dataProduct);
  }
}
