import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './sidebar.model';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  categories: SidebarCategory[] = [];

  isProfile = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ){}

  ngOnInit() {
    this.sidebarService.getCategories().subscribe(cat => this.categories = cat);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(event => {
        const url = (event as NavigationEnd).url;
        if(url.startsWith('/profile')){
          this.isProfile = true;
        } else {
          this.isProfile = false;
        }
      });
  }
}
