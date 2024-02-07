import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TipoPagoService } from 'src/app/shared/services/tipo-pago.service';
import { AgregarTipoPagoComponent } from './agregar-tipo-pago/agregar-tipo-pago.component';
import { EditarTipoPagoComponent } from './editar-tipo-pago/editar-tipo-pago.component';
import { DataTipoPago, ITipoPago, TipoPago } from 'src/app/shared/models/tipopago';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss']
})

export class TipoPagoComponent implements OnInit {
  public routes = routes;
  ListTipoPago: Array<ITipoPago> = [];
  columnas: string[] = []
  acciones: string[] = []
  tipoPagoSeleccionado: TipoPago = new TipoPago();
  dataSource!: MatTableDataSource<ITipoPago>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor(private modalService: BsModalService, public tipoPagoService: TipoPagoService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('TipoPago');
    this.acciones = ['Editar', 'Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipoPago = [];
    this.serialNumberArray = [];
    this.tipoPagoService.obtenerTiposPago(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipoPago) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoPago = data.data;
      this.dataSource = new MatTableDataSource<ITipoPago>(this.ListTipoPago);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTipoPago();
    } else if (accion.accion == 'Editar') {
      this.editarTipoPago(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTipoPago(accion.fila.tipoPagoId);
    } else if (accion.accion == 'Refresh') {
      this.refreshData();
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearTipoPago() {
    this.bsModalRef = this.modalService.show(AgregarTipoPagoComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  editarTipoPago(tipoPago: ITipoPago) {
    const initialState = {
      tipoPagoSeleccionado: tipoPago.tipoPagoId
    };
    this.bsModalRef = this.modalService.show(EditarTipoPagoComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarTipoPago(tipoPagoId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoPagoService.eliminarTipoPago(tipoPagoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Tipo de Pago eliminado en el sistema correctamente.', 'success');
              this.getTableData(this.currentPage, this.pageSize);
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
