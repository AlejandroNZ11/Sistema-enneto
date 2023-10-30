import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla.component';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormatNamePipe } from './format-name.pipe';


@NgModule({
  declarations: [TablaComponent, FormatNamePipe],
  imports: [CommonModule, MatTableModule, MatSortModule, FormsModule],
  exports: [TablaComponent],
})
export class TablaModule { }
