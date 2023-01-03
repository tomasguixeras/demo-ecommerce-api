import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Brand } from './entity/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private _brandRepository: Repository<Brand>,
  ) {}

  getAllBrands() {
    return this._brandRepository.find({});
  }

  getBrandByID(id: Brand['id']) {
    return this._brandRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createBrand(brand: CreateBrandDto) {
    if (!brand.name)
      return new HttpException('Name is required', HttpStatus.NOT_FOUND);
    const newBrand = this._brandRepository.create(brand);
    return this._brandRepository.save(newBrand);
  }

  async updateBrand(id: number, brand: CreateBrandDto) {
    const brandToUpdate = await this.getBrandByID(id);
    if (!brandToUpdate) {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return this._brandRepository.update(id, brand);
  }
}
