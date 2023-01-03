import { BrandStatus } from '../entity/brand.entity';

export interface BrandInterface {
  id?: number;
  name?: string;
  image?: string;
  status?: BrandStatus;
}
