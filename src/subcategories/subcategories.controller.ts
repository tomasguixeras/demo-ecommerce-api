import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SubategoryInterface } from './interface/subcategory.interface';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategory')
export class SubcategoriesController {
  constructor(private readonly _subcategoryService: SubcategoriesService) {}

  @Get()
  getProducts() {
    return this._subcategoryService.getAllSubcategories();
  }

  @Get(':id')
  getCategoriesById(@Param() { id }: { id: number }) {
    return this._subcategoryService.getSubcategoryById(id);
  }

  @Post()
  createProduct(@Body() subcategory: SubategoryInterface) {
    return this._subcategoryService.createSubcategory(subcategory);
  }

  @Patch(':id')
  updateProduct(
    @Param() { id }: { id: number },
    @Body() dataSubcategory: SubategoryInterface,
  ) {
    return this._subcategoryService.updateSubcategory(id, dataSubcategory);
  }
}
