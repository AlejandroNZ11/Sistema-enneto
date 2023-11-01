import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { routes } from 'src/app/shared/routes/routes';
import { ApoderadoService } from 'src/app/shared/services/apoderado.service';
import { IApoderado, DataApoderado, Apoderado } from 'src/app/shared/models/apoderado';
import { AgregarApoderadoComponent } from './agregar-apoderado/agregar-apoderado.component';
import { EditarApoderadoComponent } from './editar-apoderado/editar-apoderado.component';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.scss']
})
export class ApoderadoComponent implements OnInit {
  public routes = routes;
  listApoderados: Array<IApoderado> = [];
  columnas: string[] = []
  acciones: string[] = []
  apoderadoSeleccionado: Apoderado = new Apoderado();
  dataSource!: MatTableDataSource<IApoderado>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor(private modalService: BsModalService, public apoderadoService: ApoderadoService) { }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Apoderado');
    this.acciones = ['Editar', 'Eliminar'];
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.listApoderados = [];
    this.serialNumberArray = [];
    this.apoderadoService.obtenerApoderados(env.clinicaId, currentPage, pageSize).subscribe((data: DataApoderado) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.listApoderados = data.data;
      this.dataSource = new MatTableDataSource<IApoderado>(this.listApoderados);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearApoderado();
    } else if (accion.accion == 'Editar') {
      this.editarApoderado(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarApoderado(accion.fila.apoderadoId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearApoderado() {
    this.bsModalRef = this.modalService.show(AgregarApoderadoComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }

  editarApoderado(apoderado: IApoderado) {
    const initialState = {
      apoderadoSeleccionado: apoderado.apoderadoId
    };
    this.bsModalRef = this.modalService.show(EditarApoderadoComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarApoderado(apoderadoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apoderadoService.eliminarApoderado(apoderadoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Apoderado Eliminado en el sistema correctamente.', 'success');
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