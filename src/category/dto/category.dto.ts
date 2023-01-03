import { CategoryStatus } from '../entity/category.entity';

export class CategoryDto {
  name: string;
  status: CategoryStatus;
  image: string;
}
