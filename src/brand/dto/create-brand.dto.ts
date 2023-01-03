import { BrandStatus } from '../entity/brand.entity';

export class CreateBrandDto {
  name: string;
  image: string;
  status: BrandStatus;
}
