import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { TipoPagoService } from 'src/app/shared/services/tipo-pago.service';
import { AgregarTipoPagoComponent } from './agregar-tipo-pago/agregar-tipo-pago.component';
import { EditarTipoPagoComponent } from './editar-tipo-pago/editar-tipo-pago.component';
import { DataTipoPago, ITipoPago, tipoPago } from 'src/app/shared/models/tipopago';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss']
})
export class TipoPagoComponent implements OnInit {
  public routes = routes;
  public ListTipoPago: Array<ITipoPago> = [];
  tipoPagoSeleccionado: tipoPago = new tipoPago();
  dataSource!: MatTableDataSource<ITipoPago>;
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

  constructor(private modalService: BsModalService, public tipoPagoService: TipoPagoService) {
  }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.ListTipoPago = [];
    this.serialNumberArray = [];
    this.tipoPagoService.obtenerTiposPago(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataTipoPago) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoPago = data.data;
      this.dataSource = new MatTableDataSource<ITipoPago>(this.ListTipoPago);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListTipoPago = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.ListTipoPago.slice();
    if (!sort.active || sort.direction === '') {
      this.ListTipoPago = data;
    } else {
      this.ListTipoPago = data.sort((a, b) => {
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
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  crearTipoPago() {
    this.bsModalRef = this.modalService.show(AgregarTipoPagoComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  editarTipoPago(tipoPago: ITipoPago) {
    this.bsModalRef = this.modalService.show(EditarTipoPagoComponent);
    this.bsModalRef.content.tipoPagoSeleccionado = tipoPago.tipoPagoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  eliminarTipoPago(tipoPagoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.tipoPagoService.eliminarTipoPago(tipoPagoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Tipo de Pago eliminado en el sistema correctamente.', 'success');
              this.getTableData();
              return;
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error(error);
          });
      } else {
        return;
      }
    });
  }
}
