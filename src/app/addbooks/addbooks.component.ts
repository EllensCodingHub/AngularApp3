
import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-addbooks',
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [BookService],
  templateUrl: './addbooks.component.html',
  styleUrl: './addbooks.component.css'
})
export class AddbooksComponent implements OnInit {
  book: Book = { authorName:'', bookTitle:'', storyHook:'', genre:'', pubDate:'', publisher:'', recBy:null, starRating:null, imageName:'' };

  selectedFile: File | null = null;
  error = '';
  success = '';

  constructor(private bookService: BookService, private http: HttpClient, private router: Router) {
    // no other statements required
  }

  ngOnInit(): void {
    
  }

  addBook(f: NgForm) {
    console.log("in addBook at top");

    if (!this.book.imageName) {
      this.book.imageName = 'placeholder_100.jpg';
      console.log("in placeholder if")
    }
    
    console.log("after placeholder if");

    this.bookService.add(this.book).subscribe(
      (res: Book) => {
        this.success = 'Successfully created';

        console.log("in bookService.add subscribe");

        if (this.selectedFile && this.book.imageName != 'placeholder_100.jpg') {
          this.uploadFile();
        }

        f.reset();

        this.router.navigate(['/list']);

      },
      (err) => {
        this.error = err.error?.message || err.message || 'Error Occurred';

      }
    )
  }

  onFileSelected(event: Event): void {
    console.log("in onFileSelected");
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log("in if block in onFileSelected");
      this.selectedFile = input.files[0];
      this.book.imageName = this.selectedFile.name;
    }

    console.log("after if block in onFileSelected");
  }

  uploadFile(): void {
    console.log("before if block in uploadFile");
    if (!this.selectedFile) {
      console.log("in if block in uploadFile");
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost/Angular_App3_API/my_booksAPI_2026/upload', formData).subscribe(
        response => console.log('File uploaded successfully:', response),
        error => console.error('File upload failed:', error)
      );
  }
}
