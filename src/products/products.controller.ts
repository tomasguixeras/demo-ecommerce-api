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

  @Get('byids')
  getProductsByIds(@Body() productsId: { productsId: number[] }) {
    return this._productService.getProductsByIds(productsId.productsId);
  }

  @Get(':id')
  getProductById(@Param('id') id: Products['id']) {
    return this._productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: CreateProductDto) {
    return this._productService.createProduct(product);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: Products['id'],
    @Body() dataProduct: CreateProductDto,
  ) {
    return this._productService.updateProduct(id, dataProduct);
  }
}
