import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { Accion, classIcon, PageSize, Paginacion } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-historical-table',
  templateUrl: './historical-table.component.html',
  styleUrls: ['./historical-table.component.scss']
})
export class HistoricalTableComponent implements OnInit{


  title = '';
  dataSource: any = [];
  columnas: string[] = [];
  tableDisplayColumns: string[] = [];
  serialNumberArray: number[] = [];
  searchTag: any;
  acciones: string[] = [];

  public currentPage = 1;
  public pageIndex = 0;
  public pageSize = PageSize.size;
  public totalData = 0;
  public limit: number = this.pageSize;
  public skip = 0;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  dataFiltro!: MatTableDataSource<any>;
  public totalPages = 0;

  @Input() set total(data: number) {
    this.totalData = data;
  }
  @Input() set data(data: any) {
    this.dataSource = data;
    this.dataFiltro = new MatTableDataSource<any>(data);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  @Input() set titulo(title: any) {
    this.title = title;
  }
  @Input() set columns(columns: string[]) {
    this.columnas = columns;
    this.tableDisplayColumns = this.columnas;
  }
  @Input() set accion(data: string[]) {
    this.acciones = data;
  }


  @Input() set indice(data: number[]) {
    this.serialNumberArray = data;
  }

  @Output() action: EventEmitter<Accion> = new EventEmitter();
  @Output() MoreData: EventEmitter<Paginacion> = new EventEmitter();

  onCreate() {
    this.action.emit({ accion: 'Crear' })
  }
  onAction(accion: string, row?: any) {
    this.action.emit({ accion: accion, fila: row });
  }


  getIcon(accion: string): string {
    return classIcon(accion);
  }


  getValue(data: any, nombre: any) {
    const index: any = nombre;
    if (data) {
      this.searchTag = data.value
    }
    return data[index]
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
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


  // Funcionalidad tabla:


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

  ngOnInit(): void {
    this.MoreData.emit({ page: this.currentPage, size: this.pageSize, skip: this.skip, limit: this.limit });
  }


}
