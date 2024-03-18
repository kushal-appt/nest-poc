import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BooksService } from './book.service.js';
import { Book } from './book.model.js';
import { BookInput } from './book-input.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async books(): Promise<Book[]> {
    const books = await this.booksService.getAllBooks();
    return books;
  }

  @Get(':id')
  async bookById(@Param('id') id: string): Promise<Book | string> {
    const fetchedBook = await this.booksService.getBookById(id);
    if (fetchedBook) {
      return fetchedBook;
    }
    return `Provide a valid book id`;
  }

  @Post()
  async createBook(@Body() data: BookInput): Promise<Book | string> {
    const newBook = await this.booksService.create(data);
    return newBook;
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() data: BookInput,
  ): Promise<Book> {
    const updatedBook = await this.booksService.updateBook(id, data);
    return updatedBook;
  }

  @Delete(':id')
  async deleteBook(@Param() id: string): Promise<boolean> {
    const bookToDelete = await this.booksService.deleteBook(id);
    if (bookToDelete) {
      return true;
    }
  }
}
