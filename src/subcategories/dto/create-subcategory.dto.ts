import { Category } from 'src/category/entity/category.entity';

export class CreateSubcategoryDto {
  name: string;
  categoryId: Category['id'];
}
