import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

const materialComponents = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTableModule,
  MatDialogModule,
  MatSelectModule,
  MatBadgeModule,
  MatRadioModule,
  MatDatepickerModule,
  MatMomentDateModule
]

@NgModule({
  declarations: [],
  imports: [materialComponents],
  exports: [materialComponents],
  providers:[
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class MaterialModule { }
