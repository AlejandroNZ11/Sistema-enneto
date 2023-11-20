import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { routes } from 'src/app/shared/routes/routes';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { IPermiso, DataPermiso, Permiso } from 'src/app/shared/models/permiso';
import { AgregarPermisoComponent } from './agregar-permiso/agregar-permiso.component';
import { EditarPermisoComponent } from './editar-permiso/editar-permiso.component';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-permiso',
  templateUrl: './permiso.component.html',
  styleUrls: ['./permiso.component.scss']
})
export class PermisoComponent implements OnInit {
  public routes = routes;
  listPermisos: Array<IPermiso> = [];
  columnas: string[] = [];
  acciones: string[] = [];
  permisoSeleccionado: Permiso = new Permiso();
  dataSource!: MatTableDataSource<IPermiso>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor(private modalService: BsModalService, public permisoService: PermisoService) { }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Permiso');
    this.acciones = ['Editar', 'Eliminar'];
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.listPermisos = [];
    this.serialNumberArray = [];
    this.permisoService.obtenerPermisos(env.clinicaId, currentPage, pageSize).subscribe((data: DataPermiso) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.listPermisos = data.data;
      this.dataSource = new MatTableDataSource<IPermiso>(this.listPermisos);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearPermiso();
    } else if (accion.accion == 'Editar') {
      this.editarPermiso(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarPermiso(accion.fila.permisoId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearPermiso() {
    this.bsModalRef = this.modalService.show(AgregarPermisoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }

  editarPermiso(permiso: IPermiso) {
    const initialState = {
      permisoSeleccionado: permiso.permisoId
    };
    this.bsModalRef = this.modalService.show(EditarPermisoComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarPermiso(permisoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.permisoService.eliminarPermiso(permisoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Permiso Eliminado en el sistema correctamente.', 'success');
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
