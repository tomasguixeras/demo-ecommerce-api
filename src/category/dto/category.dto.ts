import { Products } from 'src/products/entity/products.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

export class CategoryDto {
  name: string;
  products: Products[];
  subcategory: Subcategory[];
}
