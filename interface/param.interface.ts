import { Category } from 'src/category/entity/category.entity';
import { Products } from 'src/products/entity/products.entity';

export interface ParamInterface {
  id: Products[] | Category[];
}
