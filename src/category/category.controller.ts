import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryInterface } from './interface/category.interface';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  getProducts() {
    return this._categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoriesById(@Param() paramId: CategoryInterface) {
    return this._categoryService.getCategoryById(paramId.id);
  }

  @Post()
  createProduct(@Body() category: CategoryDto) {
    return this._categoryService.createCategory(category);
  }

  @Patch(':id')
  updateProduct(
    @Param() paramId: CategoryInterface,
    @Body() dataCategory: any,
  ) {
    return this._categoryService.updateCategory(paramId.id, dataCategory);
  }
}
