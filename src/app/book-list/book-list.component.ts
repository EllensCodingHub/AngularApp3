import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  imports: [AsyncPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})


export class BookListComponent {
  // private bookService: BookService
   private readonly bookService = inject(BookService);
   readonly books$ = this.bookService.getBooks();
}
