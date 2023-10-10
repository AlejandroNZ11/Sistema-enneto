import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import { DataInventario, IInventario,inventario } from 'src/app/shared/models/inventario';
import { environment as env } from 'src/environments/environments';
import { AgregarInventarioComponent } from './agregar-inventario/agregar-inventario.component';
@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  public routes = routes;
  public ListInventario: Array<IInventario> = [];
  inventarioSeleccionada:inventario = new inventario();
  dataSource!: MatTableDataSource<IInventario>;
  public showFilter = false;
  public BuscarDatosValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  bsModalRef?: BsModalRef;
  constructor(public inventarioService: InventarioService, private modalService: BsModalService,) {
  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.ListInventario = [];
    this.serialNumberArray = [];
    this.inventarioService.obtenerInventarios(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataInventario) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListInventario = data.data;
      this.dataSource = new MatTableDataSource<IInventario>(this.ListInventario);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public BuscarDatos(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListInventario = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.ListInventario.slice();

    if (!sort.active || sort.direction === '') {
      this.ListInventario = data;
    } else {
      this.ListInventario = data.sort((a, b) => { 
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
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
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  crearInventario() {
    this.bsModalRef = this.modalService.show(AgregarInventarioComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
}  
