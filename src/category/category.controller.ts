import { ParamInterface } from './interface/param.interface';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryInterface } from './interface/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  getProducts() {
    return this._categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoriesById(@Param() paramId: ParamInterface) {
    return this._categoryService.getCategoriesById(paramId.id);
  }

  @Post()
  createProduct(@Body() category: CategoryInterface) {
    return this._categoryService.createCategory(category);
  }

  @Patch(':id')
  updateProduct(
    @Param() paramId: ParamInterface,
    @Body() dataCategory: CategoryInterface,
  ) {
    return this._categoryService.updateCategory(paramId.id, dataCategory);
  }
}
