import { Component } from '@angular/core';
import { CategoryService } from './category.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Category, CategoryProducts } from './category.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categoryProducts!: CategoryProducts;
  private subscription: Subscription = new Subscription()

  totalElements = 0;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.subscription.add(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoriesWithProducts(0, 10)));

    this.getCategoriesWithProducts(0,10);
  }

  getCategoriesWithProducts(page: number, size: number) {
    this.categoryService.getProductsByCategory(this.route.snapshot.params['slug'], page, size)
      .subscribe(cat => {
        this.categoryProducts = cat;
        this.totalElements = cat.products.totalElements;
      });
  }

  onPageChange(event: PageEvent) {
    this.getCategoriesWithProducts(event.pageIndex, event.pageSize);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
