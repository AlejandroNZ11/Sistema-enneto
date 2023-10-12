import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { AgregarTipoGastosComponent } from './agregar-tipo-gastos/agregar-tipo-gastos.component';
import { EditarTipoGastosComponent } from './editar-tipo-gastos/editar-tipo-gastos.component';
import { DataTipoGasto, ITipoGasto, tipoGasto } from 'src/app/shared/models/tipogastos';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-gastos',
  templateUrl: './tipo-gastos.component.html',
  styleUrls: ['./tipo-gastos.component.scss']
})
export class TipoGastosComponent implements OnInit {
  public routes = routes;
  public ListTipoGasto: Array<ITipoGasto> = [];
  tipoGastoSeleccionado: tipoGasto = new tipoGasto();
  dataSource!: MatTableDataSource<ITipoGasto>;
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

  constructor(private modalService: BsModalService, public tipoGastoService: TipoGastosService) {
  }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.ListTipoGasto = [];
    this.serialNumberArray = [];
    this.tipoGastoService.obtenerTipoGastos(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataTipoGasto) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoGasto = data.data;
      this.dataSource = new MatTableDataSource<ITipoGasto>(this.ListTipoGasto);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListTipoGasto = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.ListTipoGasto.slice();

    if (!sort.active || sort.direction === '') {
      this.ListTipoGasto = data;
    } else {
      this.ListTipoGasto = data.sort((a, b) => {
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

  crearTipoGastos() {
    this.bsModalRef = this.modalService.show(AgregarTipoGastosComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  editarTipoGastos(tipoGasto: ITipoGasto) {
    this.bsModalRef = this.modalService.show(EditarTipoGastosComponent);
    this.bsModalRef.content.tipoGastoSeleccionado = tipoGasto.tipoGastoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  eliminarTipoGastos(tipoGastoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.tipoGastoService.eliminarTipoGasto(tipoGastoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Tipo Gasto Eliminado en el sistema correctamente.', 'success');
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
