import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Products } from './entity/products.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly _productService: ProductsService) {}

  @Get()
  getProducts() {
    return this._productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param() param: any) {
    return this._productService.getProductById(param.id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this._productService.createProduct(product);
  }

  @Patch(':id')
  updateProduct(
    @Param() { id }: { id: number },
    @Body() dataProduct: Products,
  ) {
    return this._productService.updateProduct(id, dataProduct);
  }
}
