/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource, } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { Accion, PageSize, Paginacion, classIcon } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],

})
export class TablaComponent implements OnInit {
  public searchDataValue = '';
  public pageSize = PageSize.size;
  public totalPages = 0;
  public totalData = 0;
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public limit: number = this.pageSize;
  public skip = 0;
  public pageIndex = 0;
  isLoading = true;
  dataSource: any = [];
  dataFiltro!: MatTableDataSource<any>;
  serialNumberArray: number[] = [];
  tableDisplayColumns: string[] = [];
  columnas: string[] = [];
  acciones: string[] = [];
  searchTag: any;
  title = '';
  @Input() set total(data: number) {
    this.totalData = data;
  }
  @Input() set data(data: any) {
    this.isLoading = true;
    this.dataSource = data;
    this.dataFiltro = new MatTableDataSource<any>(data);
    this.calculateTotalPages(this.totalData, this.pageSize);
    this.isLoading = false;
  }
  @Input() set indice(data: number[]) {
    this.serialNumberArray = data;
  }
  @Input() set columns(columns: string[]) {
    this.columnas = columns;
    this.tableDisplayColumns = this.columnas;
  }
  @Input() set titulo(title: any) {
    this.title = title;
  }
  @Input() set accion(data: string[]) {
    this.acciones = data;
  }

  @Output() action: EventEmitter<Accion> = new EventEmitter();
  @Output() MoreData: EventEmitter<Paginacion> = new EventEmitter();

  onCreate() {
    this.action.emit({ accion: 'Crear' })
  }
  onAction(accion: string, row?: any) {
    this.action.emit({ accion: accion, fila: row });
  }
  getBgColor(data: any, activo: boolean): string {
    if (data.color) {
      return data.color;
    } else {
      if (activo) {
        return '#00d3c71a';
      } else { return '#e5f3fe'; }
    }
  }
  getTextColor(data: any, activo: boolean): string {
    if (data.color) {
      return this.lightenOrDarkenColor(data.color);
    } else {
      if (activo) {
        return '#00d3c7';
      } else { return '#008cff'; }
    }
  }
  lightenOrDarkenColor(hex: string) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    let result;
    if (brightness > 0.5) {
      r = Math.round(r * (1 - 0.75));
      g = Math.round(g * (1 - 0.75));
      b = Math.round(b * (1 - 0.75));
      result = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    } else {
      r = Math.round(r + (255 - r) * 0.8);
      g = Math.round(g + (255 - g) * 0.8);
      b = Math.round(b + (255 - b) * 0.8);
      result = "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
    }
    return result;
  }
  refreshData() {
    this.isLoading = true;
    setTimeout(() => {
      this.action.emit({ accion: 'Refresh' });
      this.isLoading = false;
    }, 1000);
  }
  public sortData(sort: Sort) {
    const data = this.dataSource.slice();

    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
    } else {
      this.dataSource = data.sort((a: any, b: any) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    this.dataFiltro.filter = value.trim().toLowerCase();
    this.dataSource = this.dataFiltro.filteredData;
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.MoreData.emit({ page: this.currentPage, size: this.pageSize, skip: this.skip, limit: this.limit });
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.MoreData.emit({ page: this.currentPage, size: this.pageSize, skip: this.skip, limit: this.limit });
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.MoreData.emit({ page: this.currentPage, size: this.pageSize, skip: this.skip, limit: this.limit });
    }
  }
  getValue(data: any, nombre: any) {
    const index: any = nombre;
    if (data) {
      this.searchTag = data.value
    }
    return data[index]
  }
  getIcon(accion: string): string {
    return classIcon(accion);
  }

  ngOnInit(): void {
    this.MoreData.emit({ page: this.currentPage, size: this.pageSize, skip: this.skip, limit: this.limit });
  }
}
