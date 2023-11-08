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
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html',
  styleUrls: ['./tipo-tarjeta.component.scss']
})
export class TipoTarjetaComponent implements OnInit {
  public routes = routes;
  ListTipoTarjeta: Array<ITipoTarjeta> = [];
  columnas: string[] = []
  acciones: string[] = []
  tipoTarjetaSeleccionada: tipoTarjeta = new tipoTarjeta();
  dataSource!: MatTableDataSource<ITipoTarjeta>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public tipoTarjetaService: TipoTarjetaService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('TipoTarjeta');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipoTarjeta = [];
    this.serialNumberArray = [];
    this.tipoTarjetaService.obtenerTipoTarjetas(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipoTarjetas) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoTarjeta = data.data;
      this.dataSource = new MatTableDataSource<ITipoTarjeta>(this.ListTipoTarjeta);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTarjeta();
    } else if (accion.accion == 'Editar') {
      this.editarTipoTarjeta(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminartipoTarjeta(accion.fila.tipoTarjetaId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearTarjeta() {
    this.bsModalRef = this.modalService.show(AgregarTarjetaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarTipoTarjeta(tipoTarjeta: ITipoTarjeta) {
    this.bsModalRef = this.modalService.show(EditarTarjetaComponent);
    this.bsModalRef.content.tipoPagoSeleccionado = tipoTarjeta.tipoTarjetaId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminartipoTarjeta(tipoTarjetaId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoTarjetaService.eliminarTipoTarjeta(tipoTarjetaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Tipo Tarjeta Eliminada en el sistema correctamente.', 'success');
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


