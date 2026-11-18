
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Book } from "./book"; 
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly http = inject(HttpClient);

 
// fetch the books from the PHP API and return the array inside data.
  getBooks() {
    const url = 'http://localhost/Angular_App3_API/my_books_2026/list.php';

    return this.http.get<{ data: Book[] }>(url).pipe(
      map(response => response.data)
    );
  }
}