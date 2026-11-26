import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Router, RouterLink, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatebooks',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './updatebooks.component.html',
  styleUrl: './updatebooks.component.css',
  providers: [BookService]
})
export class UpdatebooksComponent implements OnInit {

  bookID: number=0;
  book: Book = { authorName:'', bookTitle:'', storyHook:'', genre:'', pubDate:'', publisher:'', recBy:null, starRating:null, imageName:'' } // do I even need imageName here? 

  error = '';
  success = '';
  maxDate: string = '';

  constructor(
    private bookService: BookService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  // have page load with current date and time  
  ngOnInit(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    this.maxDate = `${yyyy}-${mm}-${dd}`; // date format

    this.bookID = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.get(this.bookID).subscribe({
      next: (data: Book) => {
        this.book = data;
        
      },
      error: () => this.error = 'Error loading book'
    });
  }

  updateBook(form: NgForm) {
    console.log("inside updateBook at top")
    // prepare form data
    const formData = new FormData();
    formData.append('bookID', this.bookID.toString());
    formData.append('authorName', this.book.authorName || '');
    formData.append('bookTitle', this.book.bookTitle || '');
    formData.append('storyHook', this.book.storyHook || '');
    formData.append('genre', this.book.genre || '');
    formData.append('pubDate', this.book.pubDate || '');
    formData.append('publisher', this.book.publisher || '');
    formData.append('recBy', String(this.book.recBy ?? ''));
    formData.append('starRating', String(this.book.starRating ?? ''));

    console.log(this.book.bookTitle)

    this.http.post('http://localhost/Angular_App3_API/my_booksAPI_2026/update', formData).subscribe({
    next: (response) => {
      console.log('UPDATE SUCCESS:', response);
      this.success = 'Book updated successfully.';
      this.router.navigate(['/list']);
    },
    error: (err: HttpErrorResponse) => {
      console.log('UPDATE ERROR:', err);
      console.log('HTTP STATUS:', err.status);
      console.log('ERROR BODY:', err.error);

      if (err.status == 409) {
        this.error = err.error?.error || 'Duplicate entry detected.';
      }
      else {
        this.error = 'Update failed.';
      }
    }
    });
  }
}
