import { Category } from 'src/category/entity/category.entity';
import { Products } from 'src/products/entity/products.entity';

export interface SubategoryInterface {
  id?: number;
  name: string;
  image?: string;
  status?: string;
  products: Products[];
  category: Category;
  createdAt?: Date;
}
