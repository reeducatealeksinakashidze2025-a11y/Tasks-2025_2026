import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SubscriptionGuard } from 'src/guards/user-subscription.guard';
import { ProductQueryDto } from './dto/product-query.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { IsAuthGuard } from 'src/guards/is-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(SubscriptionGuard)
  findAll(@Query() query: ProductQueryDto, @Req() req) {
    query.isActive = req.isSubscriptionActive;
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param() { id }: IsValidObjectId) {
    return this.productsService.findOne(id);
  }

  @Roles('admin')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param() { id }: IsValidObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles('admin')
  @UseGuards(IsAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param() { id }: IsValidObjectId) {
    return this.productsService.remove(id);
  }
}
