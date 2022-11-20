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
    return this._brandRepository.find();
  }

  getBrandByID(id: number) {
    return this._brandRepository.findOne({
      where: {
        id,
      },
    });
  }

  createBrand(brand: CreateBrandDto) {
    const newBrand = this._brandRepository.create(brand);
    return this._brandRepository.save(newBrand);
  }

  async updateBrand(id: number, brand: CreateBrandDto) {
    const brandExists = await this.getBrandByID(id);

    if (brandExists) {
      return this._brandRepository.update(id, brand);
    } else {
      return new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
  }
}
