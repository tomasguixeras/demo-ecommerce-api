import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BrandStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
  DELETED = 'deleted',
}

@Entity('brand')
export class Brand {
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
    enum: BrandStatus,
    default: BrandStatus.ENABLE,
  })
  status: BrandStatus;

  @CreateDateColumn()
  createdAt: Date;
}
