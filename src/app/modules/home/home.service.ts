import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { HomePageDto } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private cache$!: Observable<HomePageDto>;
  
  constructor(
    private http: HttpClient
  ) { }

  getHomePageData(): Observable<HomePageDto> {
    if (!this.cache$) {
      this.cache$ = this.http.get<HomePageDto>("api/homePage").pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }
}
