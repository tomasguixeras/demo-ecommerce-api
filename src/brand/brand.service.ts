import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Brand } from './entity/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Products } from 'src/products/entity/products.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private _brandRepository: Repository<Brand>,
    @InjectRepository(Products)
    private _productsRepository: Repository<Products>,
  ) {}

  getAllBrands() {
    return this._brandRepository.find({
      relations: ['products'],
    });
  }

  getBrandByID(id: number) {
    return this._brandRepository.findOne({
      relations: ['products'],
      where: {
        id,
      },
    });
  }

  async createBrand(brand: CreateBrandDto) {
    const products = await this._productsRepository.find({
      relations: ['brand', 'subcategory', 'category'],
      where: {
        id: In([...brand.products]),
      },
    });
    if (products.length !== brand.products.length)
      return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    const newBrand = this._brandRepository.create({
      name: brand.name,
      products: products,
    });
    return this._brandRepository.save(newBrand);
  }

  async updateBrand(id: number, brand: CreateBrandDto) {
    const brandToUpdate = await this.getBrandByID(id);
    let productsOfBrand;
    if (!brandToUpdate) {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    if (brand.products) {
      productsOfBrand = await this._productsRepository.find({
        relations: ['brand', 'subcategory', 'category'],
        where: {
          id: In([...brand.products]),
        },
      });
      if (productsOfBrand.length !== brand.products.length)
        return new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(brandToUpdate, {
      name: brand.name && brand.name,
      image: brand.image && brand.image,
      status: brand.status && brand.status,
      products: brand.products && productsOfBrand,
    });
    this._brandRepository.save(brandToUpdate);
  }
}
