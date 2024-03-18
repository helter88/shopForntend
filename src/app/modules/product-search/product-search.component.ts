import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    console.log("from component: ", this.route.snapshot.queryParams["query"]);
  }

}
