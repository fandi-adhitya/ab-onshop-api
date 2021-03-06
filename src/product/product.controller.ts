import { Controller, HttpCode, Post, HttpStatus, Body, Get, Query, Delete, Put, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Helper } from 'common/helpers';
import { diskStorage } from 'multer';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { ProductCategoryQuery, ProductIdQuery, ProductQuery, ProductSlugQuery } from './query';

@Controller('products')
export class ProductController {
  
  constructor(
    private productService : ProductService
  ){}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(@Query() query : ProductQuery){
    return this.productService.getProducts(query)
  }

  @HttpCode(HttpStatus.OK)
  @Get('/details')
  getProductById(@Query() query : ProductSlugQuery){
    return this.productService.getProductBySlug(query)
  }

  @HttpCode(HttpStatus.OK)
  @Get('category')
  getProductByCategory(@Query() query: ProductCategoryQuery){
    return this.productService.getProductByCategory(query)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createProduct(@Body() dto : ProductDto) {
    return this.productService.createProduct(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  updateProduct(@Body() dto : ProductDto, @Query() query : ProductIdQuery) {
    return this.productService.updateProduct(dto, query)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete')
  deleteProduct(@Query() query : ProductIdQuery){
    return this.productService.deleteProduct(query)
  }


  @HttpCode(HttpStatus.CREATED)
  @Post('uploads')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name : "file",
        maxCount : 10,
      }
    ], {
      storage: diskStorage({
        destination : Helper.destinationPath,
        filename : Helper.customFileName
      }),
      fileFilter : Helper.fileFilter
    }),
  )
  uploadImages(
    @UploadedFiles() files : {file : Express.Multer.File[]} ,
    @Query() product : ProductIdQuery
  ) {
    return this.productService.uploadImages(files, product)
  }

}
