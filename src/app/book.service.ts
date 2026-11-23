
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Book } from "./book"; 

@Injectable({ providedIn: 'root' })

export class BookService {
  baseURL = 'http://localhost/Angular_App3_API/my_booksAPI_2026';

  constructor(private http: HttpClient) {
    // no statements required
  }
 
// fetch the books from the PHP API and return the array inside data.
  getAll() {
    return this.http.get(`${this.baseURL}/list.php`).pipe(
      map((res:any) => {
        return res['data'];
      })
    )
  }
  add(book: Book) {
    return this.http.post(`${this.baseURL}/add`, {data: book}).pipe(
      map((res:any) => {
        return res['data'];
      })
    )
  }
  delete(bookID: any) {
    const params = new HttpParams().set('bookID', bookID.toString());
    return this.http.get(`${this.baseURL}/delete`, {params: params});
  }
  update(book: Book) {
    return this.http.put(`${this.baseURL}/update`, {data: book});
  }
  get(bookID: number) {
    return this.getAll().pipe(
      map((books: Book[]) => {
        const book = books.find(book => Number(book.bookID) === bookID);

        if (!book) {
          throw new Error('Book not found.');
        }

        return book;
      })
    );
  }
}