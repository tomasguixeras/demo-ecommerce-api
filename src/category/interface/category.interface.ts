import { Products } from 'src/products/entity/products.entity';
import { Subcategory } from 'src/subcategories/entities/subcategory.entity';

export interface CategoryInterface {
  id?: number;
  name?: string;
  image?: string;
  status?: string;
  createdAt?: Date;
  products?: Products[];
  subcategory?: Subcategory[];
}
