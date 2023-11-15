import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { DataUsuario, IUsuario, Usuario } from 'src/app/shared/models/usuario';
import { environment as env } from 'src/environments/environments';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public routes = routes;
  ListUsuario: Array<IUsuario> = [];
  columnas: string[] = [];
  acciones: string[] = [];
  usuarioSeleccionado: Usuario = new Usuario();
  dataSource!: MatTableDataSource<IUsuario>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor(private modalService: BsModalService, public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.columnas = getEntityPropiedades('Usuario');
    this.acciones = ['Editar', 'Eliminar'];
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListUsuario = [];
    this.serialNumberArray = [];
    this.usuarioService.obtenerUsuarios(env.clinicaId, currentPage, pageSize).subscribe((data: DataUsuario) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListUsuario = data.data;
      this.dataSource = new MatTableDataSource<IUsuario>(this.ListUsuario);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearUsuario();
    } else if (accion.accion == 'Editar') {
      this.editarUsuario(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminarUsuario(accion.fila.usuarioId);
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearUsuario() {
    this.bsModalRef = this.modalService.show(AgregarUsuarioComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  editarUsuario(usuario: IUsuario) {
    const initialState = {
      usuarioSeleccionado: usuario.usuarioId
    };
    this.bsModalRef = this.modalService.show(EditarUsuarioComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarUsuario(usuarioId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuarioId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Usuario eliminado en el sistema correctamente.', 'success');
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
