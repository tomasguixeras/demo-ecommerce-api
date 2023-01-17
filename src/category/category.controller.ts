import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './entity/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly _categoryService: CategoryService) {}

  @Get()
  getProducts() {
    return this._categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoriesById(@Param('id') id: Category['id']) {
    return this._categoryService.getCategoryById(id);
  }

  @Post()
  createProduct(@Body() category: CategoryDto) {
    return this._categoryService.createCategory(category);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: Category['id'], @Body() dataCategory: any) {
    return this._categoryService.updateCategory(id, dataCategory);
  }
}
