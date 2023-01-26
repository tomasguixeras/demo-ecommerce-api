import { Category } from 'src/category/entity/category.entity';
import { Products } from 'src/products/entity/products.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

export enum SubcategoriesStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
  DELETED = 'deleted',
}

@Entity('subcategory')
export class Subcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  image: string | null;

  @Column({
    type: 'enum',
    enum: SubcategoriesStatus,
    default: SubcategoriesStatus.ENABLE,
  })
  status: SubcategoriesStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Products, (products) => products.subcategory)
  @JoinColumn()
  products: Products[];

  @ManyToOne(() => Category, (category) => category.name)
  @JoinColumn()
  category: Category;
}
