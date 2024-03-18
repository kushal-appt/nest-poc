import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { BookInput } from './book-input.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async create(data: BookInput): Promise<Book> {
    const bookToCreate: Book = await this.bookRepo.create(data as BookInput);
    const book = await this.bookRepo.save(bookToCreate);
    if (book) {
      return book;
    }
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepo.find();
  }

  async getBookById(id: string): Promise<Book> {
    return await this.bookRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateBook(id: string, dataToUpdate: BookInput): Promise<Book> {
    const selectedBook = await this.bookRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!selectedBook) {
      throw new Error(`Please provide a valid book id`);
    }
    const updateBook = await this.bookRepo.save(
      Object.assign(selectedBook, dataToUpdate),
    );
    if (updateBook) {
      return updateBook;
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    const fetchedBook = await this.bookRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!fetchedBook) {
      return false;
    }
    return true;
  }
}
