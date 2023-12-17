import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminConfirmationDialogComponent } from './admin-confirmation-dialog/admin-confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AdminConfirmationDialogService {

  constructor(
    private matDialog: MatDialog
  ) { }

  openConfirmationDialog(): MatDialogRef<AdminConfirmationDialogComponent, boolean>{
    return this.matDialog.open(AdminConfirmationDialogComponent,{
      width: '400px'
    })
  }
}
