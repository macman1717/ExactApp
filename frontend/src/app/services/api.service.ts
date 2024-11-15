import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../environment";
import {ExactScholar} from "../pages/admin-dashboard-page/exact-scholar-interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  environment = environment;
  constructor(private http: HttpClient) {
  }
  getMessage() {
    return this.http.get(
      `${environment.apiURL}/api/message`);
  }
  getHelloWorld() {
    return this.http.get(
      `${environment.apiURL}/api/hello-World`
    );
  }

  getHomePageContent() {
    return this.http.get(
      `${environment.apiURL}/JSON/homePage.json`
    )
  }

  getExactScholars() {
      return this.http.get<ExactScholar[]>(
        `${environment.apiURL}/api/getExactScholars`);
    }
}
