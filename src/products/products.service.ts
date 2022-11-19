import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './entity/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private _productsService: Repository<Products>,
  ) {}

  getAllProducts() {
    return this._productsService.find();
  }

  getProductById(id: number) {
    return this._productsService.findOne({
      where: {
        id,
      },
    });
  }

  createProduct(product: CreateProductDto) {
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
