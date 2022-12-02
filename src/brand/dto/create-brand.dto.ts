import { Products } from 'src/products/entity/products.entity';
import { BrandStatus } from '../entity/brand.entity';

export class CreateBrandDto {
  name: string;
  products: Products[];
  image: string;
  status: BrandStatus;
}
