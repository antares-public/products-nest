import {
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { ProductService } from 'src/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  // @Redirect('https://google.com', 301)
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'name')
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }
}
