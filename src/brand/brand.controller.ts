import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandInterface } from './interface/newbrand.interface';

@Controller('brand')
export class BrandController {
  constructor(private _brandService: BrandService) {}

  @Get()
  getAllBrands() {
    return this._brandService.getAllBrands();
  }

  @Get(':id')
  getBrandByID(@Param() param: BrandInterface) {
    return this._brandService.getBrandByID(param.id);
  }

  @Post()
  createBrand(@Body() brand: CreateBrandDto) {
    return this._brandService.createBrand(brand);
  }

  @Patch(':id')
  updateBrand(@Param() param: BrandInterface, @Body() brand: CreateBrandDto) {
    return this._brandService.updateBrand(param.id, brand);
  }
}
