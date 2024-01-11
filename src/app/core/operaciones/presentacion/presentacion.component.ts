import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { PresentacionService } from 'src/app/shared/services/presentacion.service';
import { AgregarPresentacionComponent } from './agregar-presentacion/agregar-presentacion.component';
import { EditarPresentacionComponent } from './editar-presentacion/editar-presentacion.component';
import { DataPresentacion, Ipresentacion, presentacion } from 'src/app/shared/models/presentacion';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.scss']
})
 

export class PresentacionComponent implements OnInit {
  public routes = routes;
  Listpresentaciones: Array<Ipresentacion> = [];
  columnas: string[] = []
  acciones: string[] = []
  presentacionSeleccionada: presentacion = new presentacion();
  dataSource!: MatTableDataSource<Ipresentacion>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public presentacionService: PresentacionService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Presentacion');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.Listpresentaciones = [];
    this.serialNumberArray = [];
    this.presentacionService.obtenerPresentaciones(env.clinicaId, currentPage, pageSize).subscribe((data: DataPresentacion) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.Listpresentaciones = data.data;
      this.dataSource = new MatTableDataSource<Ipresentacion>(this.Listpresentaciones);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearPresentacion();
    } else if (accion.accion == 'Editar') {
      this.editarPresentacion(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarPresentacion(accion.fila.presentacionId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearPresentacion() {
    this.bsModalRef = this.modalService.show(AgregarPresentacionComponent);
  
    this.bsModalRef.content.presentacionAgregada$.subscribe((presentacionAgregada: boolean) => {
      if (presentacionAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarPresentacion(presentacion: Ipresentacion) {
    const initialState= {
      presentacionSeleccionada: presentacion.presentacionId
    }
    this.bsModalRef = this.modalService.show(EditarPresentacionComponent, { initialState });
    const presentacionEditada$ = new Subject<boolean>();
    this.bsModalRef.content.presentacionEditada$ = presentacionEditada$;
    presentacionEditada$.subscribe((presentacionEditada: boolean) => {
      if (presentacionEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      presentacionEditada$.unsubscribe();   
    });
  }
  eliminarPresentacion(presentacionId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.presentacionService.eliminarPresentacion(presentacionId).subscribe(
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
      }else{
        return;
      }
    })
    
  }
}
