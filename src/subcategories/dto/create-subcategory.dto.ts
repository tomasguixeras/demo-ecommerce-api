import { Category } from 'src/category/entity/category.entity';
import { Products } from 'src/products/entity/products.entity';

export class CreateSubcategoryDto {
  name: string;
  products: Products[];
  category: any;
}
