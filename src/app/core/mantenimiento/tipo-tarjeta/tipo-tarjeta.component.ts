import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TipoTarjetaService } from 'src/app/shared/services/tipo-tarjeta.service'
import { DataTipoTarjetas, ITipoTarjeta, tipoTarjeta } from 'src/app/shared/models/tipotarjeta';
import { environment as env } from 'src/environments/environments';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';
import { EditarTarjetaComponent } from './editar-tarjeta/editar-tarjeta.component';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tipo-tarjeta',
  templateUrl: './tipo-tarjeta.component.html',
  styleUrls: ['./tipo-tarjeta.component.scss']
})
export class TipoTarjetaComponent implements OnInit {
  public routes = routes;
  ListTipoTarjeta: Array<ITipoTarjeta> = [];
  tipoTarjetaSeleccionada: tipoTarjeta = new tipoTarjeta();
  dataSource!: MatTableDataSource<ITipoTarjeta>;
  columnas: string[] = []
  acciones: string[] = []
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
    }else if (accion.accion == 'Refresh') {
      this.refreshData();
    }
    
  }
  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }
  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearTarjeta() {
    this.bsModalRef = this.modalService.show(AgregarTarjetaComponent);
  
    this.bsModalRef.content.tipoTarjetaAgregada$.subscribe((tipoTarjetaAgregada: boolean) => {
      if (tipoTarjetaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarTipoTarjeta(tipoTarjeta: ITipoTarjeta) {
    const initialState = {
      tipoTarjetaSeleccionada: tipoTarjeta.tipoTarjetaId
    };
  
    this.bsModalRef = this.modalService.show(EditarTarjetaComponent, { initialState });
    const tipoTarjetaEditada$ = new Subject<boolean>();
    this.bsModalRef.content.tipoTarjetaEditada$ = tipoTarjetaEditada$;
    tipoTarjetaEditada$.subscribe((tipoTarjetaEditada: boolean) => {
      if (tipoTarjetaEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      tipoTarjetaEditada$.unsubscribe();   
    });
  }
  eliminartipoTarjeta(tipoTarjetaId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoTarjetaService.eliminarTipoTarjeta(tipoTarjetaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message, '', 'success');
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


