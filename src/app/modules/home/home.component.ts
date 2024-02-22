import { Component } from '@angular/core';
import { HomePageDto } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  data!: HomePageDto;

  constructor(
    private homeService: HomeService
  ) {}
  ngOnInit(): void {
    this.getHomePageData();
  }

  getHomePageData(){
    this.homeService.getHomePageData()
      .subscribe(data => this.data = data);
  }
}
