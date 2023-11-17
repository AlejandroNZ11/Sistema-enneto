import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import { AgregarUnidadesComponent } from './agregar-unidades/agregar-unidades.component';
import { EditarUnidadesComponent } from './editar-unidades/editar-unidades.component';
import { DataUnidad, Iunidad, unidad } from 'src/app/shared/models/unidades';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
@Component({
  selector: 'app-unidades', 
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit{
  public routes = routes;
  ListUnidad: Array<Iunidad> = [];
  columnas: string[] = []
  acciones: string[] = []
  categoriaSeleccionada: unidad = new unidad();
  dataSource!: MatTableDataSource<Iunidad>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public UnidadService: UnidadesService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Unidad');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListUnidad = [];
    this.serialNumberArray = [];
    this.UnidadService.obtenerUnidades(env.clinicaId, currentPage, pageSize).subscribe((data: DataUnidad) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListUnidad = data.data;
      this.dataSource = new MatTableDataSource<Iunidad>(this.ListUnidad);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearUnidad();
    } else if (accion.accion == 'Editar') {
      this.editarUnidad(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarUnidad(accion.fila.unidadId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearUnidad() {
    this.bsModalRef = this.modalService.show(AgregarUnidadesComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarUnidad(unidad: Iunidad) {
    this.bsModalRef = this.modalService.show(EditarUnidadesComponent);
    this.bsModalRef.content.unidadSeleccionada = unidad.unidadId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarUnidad(unidadId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.UnidadService.eliminarUnidad(unidadId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Unidad Eliminada en el sistema correctamente.', 'success');
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
