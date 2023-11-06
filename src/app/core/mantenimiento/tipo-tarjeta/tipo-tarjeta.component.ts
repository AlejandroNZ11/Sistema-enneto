import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service'
import { DataTipoTarjetas, ITipoTarjeta, tipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { environment as env } from 'src/environments/environments';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';
import { EditarTarjetaComponent } from './editar-tarjeta/editar-tarjeta.component';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html',
  styleUrls: ['./tipo-tarjeta.component.scss']
})
export class TipoTarjetaComponent implements OnInit {
  public routes = routes;
  public ListTipoTarjeta: Array<ITipoTarjeta> = [];
  tipoTarjetaSeleccionado: tipoTarjeta = new tipoTarjeta();
  dataSource!: MatTableDataSource<ITipoTarjeta>;
  public showFilter = false;
  public searchDataValue = '';
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

  constructor(private modalService: BsModalService, public tipoTarjetaService: TipoTarjetaService) {
  }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.ListTipoTarjeta = [];
    this.serialNumberArray = [];
    this.tipoTarjetaService.obtenerTipoTarjetas(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataTipoTarjetas) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoTarjeta = data.data;
      this.dataSource = new MatTableDataSource<ITipoTarjeta>(this.ListTipoTarjeta);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListTipoTarjeta = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.ListTipoTarjeta.slice();

    if (!sort.active || sort.direction === '') {
      this.ListTipoTarjeta = data;
    } else {
      this.ListTipoTarjeta = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  crearTarjeta() {
    this.bsModalRef = this.modalService.show(AgregarTarjetaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  editarTipoTarjeta(tipoTarjeta: ITipoTarjeta) {
    this.bsModalRef = this.modalService.show(EditarTarjetaComponent);
    this.bsModalRef.content.tipoPagoSeleccionado = tipoTarjeta.tipoTarjetaId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }
  
}


