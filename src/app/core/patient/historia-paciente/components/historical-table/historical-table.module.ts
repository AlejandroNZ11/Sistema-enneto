import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalTableComponent } from './historical-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { HistoricalFormatNamePipe } from './historical-format-name.pipe';




@NgModule({
  declarations: [
    HistoricalTableComponent,
    HistoricalFormatNamePipe
  ],
  imports: [
    CommonModule, MatTableModule, MatSortModule, FormsModule
  ],
  exports: [HistoricalTableComponent],
})
export class HistoricalTableModule { }
