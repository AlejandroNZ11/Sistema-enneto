import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { RolesService } from 'src/app/shared/services/roles.service';
import { AgregarRolesComponent } from './agregar-roles/agregar-roles.component';
import { EditarRolesComponent } from './editar-roles/editar-roles.component';
import { DataRoles, Iroles, roles } from 'src/app/shared/models/rol';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})

export class RolComponent implements OnInit{
  public routes = routes;
  Listroles: Array<Iroles> = [];
  columnas: string[] = []
  acciones: string[] = []
  rolSeleccionada: roles = new roles();
  dataSource!: MatTableDataSource<Iroles>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public rolService: RolesService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Rol');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.Listroles = [];
    this.serialNumberArray = [];
    this.rolService.obtenerRoles(env.clinicaId, currentPage, pageSize).subscribe((data: DataRoles) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.Listroles = data.data;
      this.dataSource = new MatTableDataSource<Iroles>(this.Listroles);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearRol();
    } else if (accion.accion == 'Editar') {
      this.editarRol(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarRol(accion.fila.rolesId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  crearRol() {
    this.bsModalRef = this.modalService.show(AgregarRolesComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarRol(roles: Iroles) {
    this.bsModalRef = this.modalService.show(EditarRolesComponent);
    this.bsModalRef.content.rolSeleccionada = roles.nombre;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarRol(rolesId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.rolService.eliminarRol(rolesId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Rol Eliminado en el sistema correctamente.', 'success');
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


