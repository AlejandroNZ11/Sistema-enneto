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
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Accion, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-citado',
  templateUrl: './tipo-citado.component.html',
  styleUrls: ['./tipo-citado.component.scss']
})
export class TipoCitadoComponent implements OnInit {
  public routes = routes;
  public ListTipoCitados: Array<ItipoCitado> = [];
  columnas: string[] = []
  acciones: string[] = []
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
    this.columnas = getEntityPropiedades('EstadoCita');
    this.acciones = ['Editar', 'Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipoCitados = [];
    this.serialNumberArray = [];
    this.tipoCitadoService.obtenerTiposCitados(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipoCitado) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoCitados = data.data;
      this.dataSource = new MatTableDataSource<ItipoCitado>(this.ListTipoCitados);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTipoCitado();
    } else if (accion.accion == 'Editar') {
      this.editarTipoCitado(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTipoCitado(accion.fila.tipoCitadoId)
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

  crearTipoCitado() {
    this.bsModalRef = this.modalService.show(AgregarTipoCitadoComponent),
      this.bsModalRef.content.citadoAgregada$.subscribe((citadoAgregada: boolean) => {
        if (citadoAgregada) {
          this.getTableData(this.currentPage, this.pageSize);
        }
      });
  }

  editarTipoCitado(tipoCitado: ItipoCitado) {
    const initialState = {
      tipoCitadoSeleccionado: tipoCitado.tipoCitadoId
    };
    this.bsModalRef = this.modalService.show(EditarTipoCitadoComponent, { initialState });
    const citadoEditada$ = new Subject<boolean>();
    this.bsModalRef.content.citadoEditada$ = citadoEditada$;
    citadoEditada$.subscribe((tipoCitadoEditado: boolean) => {
      if (tipoCitadoEditado) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      citadoEditada$.unsubscribe();
    });
  }

  eliminarTipoCitado(tipoCitadoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoCitadoService.eliminarTipoCitado(tipoCitadoId).subscribe(
          (response: { isSuccess: any; message: any; }) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', response.message, 'success');
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



