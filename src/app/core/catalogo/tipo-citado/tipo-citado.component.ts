import { Component, OnInit } from '@angular/core';
import { pageSelection } from 'src/app/shared/models/models';
import { EditarTipoCitadoComponent } from './editar-tipo-citado/editar-tipo-citado.component';
import { AgregarTipoCitadoComponent } from './agregar-tipo-citado/agregar-tipo-citado.component';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoCitadoService } from 'src/app/shared/services/tipo-citado.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { DataTipoCitado, ItipoCitado, tipoCitado } from 'src/app/shared/models/tipoCitado';
import { environment as env } from 'src/environments/environments';

@Component({
  selector: 'app-tipo-citado',
  templateUrl: './tipo-citado.component.html',
  styleUrls: ['./tipo-citado.component.scss']
})
export class TipoCitadoComponent implements OnInit{
  public routes = routes;
  public ListTipoCitados: Array<ItipoCitado> = [];
  tipoCitadoSeleccionado: tipoCitado = new tipoCitado();
  dataSource!: MatTableDataSource<ItipoCitado>;
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
  constructor(private modalService: BsModalService, public tipoCitadoService: TipoCitadoService) {
  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.ListTipoCitados = [];
    this.serialNumberArray = [];
    this.tipoCitadoService.obtenerTiposCitados(env.clinicaId,this.currentPage, this.pageSize).subscribe((data: DataTipoCitado) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoCitados = data.data;
      this.dataSource = new MatTableDataSource<ItipoCitado>(this.ListTipoCitados);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListTipoCitados = this.dataSource.filteredData;
  }
  public sortData(sort: Sort) {
    const data = this.ListTipoCitados.slice();

    if (!sort.active || sort.direction === '') {
      this.ListTipoCitados = data;
    } else {
      this.ListTipoCitados = data.sort((a, b) => {
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
  crearTipoCitado() {
    this.bsModalRef = this.modalService.show(AgregarTipoCitadoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  editarTipoCitado(tipoCitado: ItipoCitado) {
    this.bsModalRef = this.modalService.show(EditarTipoCitadoComponent);
    this.bsModalRef.content.especialidadSeleccionada = tipoCitado.tipoCitadoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }
}



