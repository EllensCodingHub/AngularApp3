import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-books',
  imports: [AsyncPipe, CommonModule, RouterLink],
  providers: [BookService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})


export class BooksComponent implements OnInit {

  title = "Library";

  public books: Book[] = [];

  book: Book = { authorName:'', bookTitle:'', storyHook:'', genre:'', pubDate:'', publisher:'', recBy:null, starRating:null };

  error = '';
  success = '';

  constructor(private bookService: BookService, private http: HttpClient) {
    // no other statements required
  }
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAll().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.success = 'successful list retrieval';
        console.log(this.success);
        console.log(this.books);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBook(bookID: number): void {
    const confirmed = window.confirm("Are you sure you want to delete this book?");

    if(!confirmed) {
      return;
    }

    this.bookService.delete(bookID).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.bookID && +book.bookID != +bookID);
        this.success = "Deleted successfully.";
      },
      error: err => this.error = err.message
    });
  }
   
}
