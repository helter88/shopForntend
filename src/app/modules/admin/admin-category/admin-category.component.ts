import { Component } from '@angular/core';
import { AdminCategory } from '../admin.model';
import { AdminCategoryService } from './admin-category.service';
import { AdminConfirmationDialogService } from '../admin-confirmation-dialog.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  displayedColumns: string[] = ["id", "name", "actions"];
  totalElements: number = 0;
  categories: AdminCategory[]  = [];

  constructor(
    private adminCategoryService: AdminCategoryService,
    private adminConfirmationDialogService: AdminConfirmationDialogService
  ){}

  ngOnInit() {
    this.adminCategoryService.getCategories().subscribe(cat => this.categories = cat);
  }

  confirmDelete(id: number){
    this.adminConfirmationDialogService.openConfirmationDialog()
    .afterClosed()
    .subscribe(res =>{
      if(res){
        this.adminCategoryService.deleteCategory(id)
        .subscribe(() => {
          this.categories =this.categories.filter(cat => cat.id !== id);
        })
      }
    })
  }
}