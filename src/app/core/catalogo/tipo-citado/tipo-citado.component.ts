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
import { Accion, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-citado',
  templateUrl: './tipo-citado.component.html',
  styleUrls: ['./tipo-citado.component.scss']
})
export class TipoCitadoComponent implements OnInit{
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
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipoCitados = [];
    this.serialNumberArray = [];
    this.tipoCitadoService.obtenerTiposCitados(env.clinicaId,currentPage, pageSize).subscribe((data: DataTipoCitado) => {
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
      this.eliminarTipoCitado(accion.fila.tipoConceptoId)
    }
  }


  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
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
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarTipoCitado(tipoCitado: ItipoCitado) {
    this.bsModalRef = this.modalService.show(EditarTipoCitadoComponent);
    this.bsModalRef.content.tipoCitadoSeleccionado = tipoCitado.tipoCitadoId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
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
              Swal.fire('Correcto', 'Estado Cita Eliminado en el sistema correctamente.', 'success');
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



