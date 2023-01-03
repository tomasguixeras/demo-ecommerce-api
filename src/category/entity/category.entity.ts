import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum CategoryStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
  DELETED = 'deleted',
}

@Entity('category')
export class Category {
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
    enum: CategoryStatus,
    default: CategoryStatus.ENABLE,
  })
  status: CategoryStatus;

  @CreateDateColumn()
  createdAt: Date;
}
