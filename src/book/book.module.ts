import { Module } from '@nestjs/common';
import { BooksController } from './book.controller.js';
import { BooksService } from './book.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.model.js';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
