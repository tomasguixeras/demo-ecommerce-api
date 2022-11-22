import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { SubcategoriesController } from './subcategories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
