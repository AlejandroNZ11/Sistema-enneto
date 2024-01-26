import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { PagosService } from 'src/app/shared/services/pagos.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { environment as env } from 'src/environments/environments';
import { DataPago, Ipago, Pago } from 'src/app/shared/models/pagos';
import { AgregarPagoComponent } from './agregar-pago/agregar-pago.component';
import { EditarPagoComponent } from './editar-pago/editar-pago.component';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {
  public routes = routes;
  public ListPagos: Array<Ipago> = [];
  pagosSeleccionada: Pago = new Pago();
  dataSource!: MatTableDataSource<Ipago>;
  columnas: string[] = []
    acciones: string[] = []
    pageSize = PageSize.size;
    totalData = 0;
    skip = 0;
    serialNumberArray: Array<number> = [];
    currentPage = 1;
    bsModalRef?: BsModalRef;
    limit: number = this.pageSize;

  constructor(
    private modalService: BsModalService, 
    public pagosService: PagosService,
    ) {}

  ngOnInit() {
    this.columnas = getEntityPropiedades('Pago');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListPagos = [];
    this.serialNumberArray = [];
    this.pagosService.obtenerPagos(env.clinicaId, currentPage, pageSize).subscribe((data: DataPago) => {
        this.totalData = data.totalData
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
            const serialNumber = index + 1;
            this.serialNumberArray.push(serialNumber);
        }
        this.ListPagos = data.data;
        this.dataSource = new MatTableDataSource<Ipago>(this.ListPagos);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
        this.crearPago();
    } else if (accion.accion == 'Editar') {
        this.editarPago(accion.fila)
    } else if (accion.accion == 'Eliminar') {
        this.eliminarPago(accion.fila.pagoId)
    }
  }
  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearPago() {
    this.bsModalRef = this.modalService.show(AgregarPagoComponent),
    this.bsModalRef.content.pagoAgregada$.subscribe((pagoAgregada: boolean) => {
    if (pagoAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
        }
    });
  }
  editarPago(pago: Ipago) {
    const initialState = {
    PagoSeleccionada: pago.pagoId
    };
    this.bsModalRef = this.modalService.show(EditarPagoComponent, { initialState });
    const pagoEditada$ = new Subject<boolean>();
    this.bsModalRef.content.pagoEditada$ = pagoEditada$;
    pagoEditada$.subscribe((pagoEditada: boolean) => {
        if (pagoEditada) {
            this.getTableData(this.currentPage, this.pageSize);
        }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
        pagoEditada$.unsubscribe();   
    });
  }
  eliminarPago (pagoId: string) {
    Swal.fire({
        title: '¿Estas seguro que deseas eliminar?',
        showDenyButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            this.pagosService.eliminarPago(pagoId).subscribe(
                (response) => {
                    if (response.isSuccess) {
                        Swal.fire(response.message,'', 'success');
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
    })
  }
}
