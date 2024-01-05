import { Component } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SidebarCategory } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  categories: SidebarCategory[] = [];

  constructor(
    private sidebarService: SidebarService
  ){}

  ngOnInit() {
    this.sidebarService.getCategories().subscribe(cat => this.categories = cat);
  }

}
