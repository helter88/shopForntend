import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HomePageDto } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  getHomePageData(): Observable<HomePageDto> {
    return this.http.get<HomePageDto>("api/homePage");
  }
}
