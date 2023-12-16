import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminProduct } from '../admin.model';
import { AdminProductService } from './admin-product.service';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements AfterViewInit {
  // dataSource: AdminProduct[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = ["id", "name", "price", "actions"];
  totalElements: number = 0;
  products: AdminProduct[] = []

  constructor(
    private adminProductService: AdminProductService
  ){}

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      startWith({}),
      switchMap(()=> {
        return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
      }),
      map(page => {
        this.totalElements = page.totalElements;
        return page.content
      })
    ).subscribe(products => this.products = products);
  }
}
