

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })

export class Auth {
  baseURL = 'http://localhost/Angular_App3_API/my_booksAPI_2026';

  constructor(private http: HttpClient, private router: Router) {
    // no statements required
  }
  register(user: any) {
    return this.http.post<any>(`${this.baseURL}/register.php`, user);
  }
}