import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategory')
export class SubcategoriesController {
  constructor(private readonly _subcategoryService: SubcategoriesService) {}

  @Get()
  getSubcategories() {
    return this._subcategoryService.getAllSubcategories();
  }

  @Get(':id')
  getSubcategoriesById(@Param('id') id: Subcategory['id']) {
    return this._subcategoryService.getSubcategoryById(id);
  }

  @Post()
  createSubcategory(@Body() subcategory: CreateSubcategoryDto) {
    return this._subcategoryService.createSubcategory(subcategory);
  }

  @Patch(':id')
  updateSubcategory(
    @Param('id') id: Subcategory['id'],
    @Body() dataSubcategory: CreateSubcategoryDto,
  ) {
    return this._subcategoryService.updateSubcategory(id, dataSubcategory);
  }
}
