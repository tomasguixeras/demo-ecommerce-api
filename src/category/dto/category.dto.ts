import { Products } from 'src/products/entity/products.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';
import { CategoryStatus } from '../entity/category.entity';

export class CategoryDto {
  name: string;
  products: Products[];
  subcategory: Subcategory[];
  status: CategoryStatus;
  image: string;
}
