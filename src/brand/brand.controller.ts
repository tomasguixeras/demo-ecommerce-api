import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand } from './entity/brand.entity';

@Controller('brand')
export class BrandController {
  constructor(private _brandService: BrandService) {}

  @Get()
  getAllBrands() {
    return this._brandService.getAllBrands();
  }

  @Get(':id')
  getBrandByID(@Param('id') id: Brand['id']) {
    return this._brandService.getBrandByID(id);
  }

  @Post()
  createBrand(@Body() brand: CreateBrandDto) {
    return this._brandService.createBrand(brand);
  }

  @Patch(':id')
  updateBrand(@Param('id') id: Brand['id'], @Body() brand: CreateBrandDto) {
    return this._brandService.updateBrand(id, brand);
  }
}
