import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { EspecialidadesService } from 'src/app/shared/services/especialidades.service';
import { AgregarEspecialidadComponent } from './agregar-especialidad/agregar-especialidad.component';
import { EditarEspecialidadComponent } from './editar-especialidad/editar-especialidad.component';
import { DataEspecialidad, Iespecialidad, especialidad } from 'src/app/shared/models/especialidades';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})

export class EspecialidadesComponent implements OnInit {
  public routes = routes;
  ListEspecialidad: Array<Iespecialidad> = [];
  columnas: string[] = []
  acciones: string[] = []
  especialidadSeleccionada: especialidad = new especialidad();
  dataSource!: MatTableDataSource<Iespecialidad>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public especialidadService: EspecialidadesService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Especialidad');
    this.acciones = ['Editar', 'Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListEspecialidad = [];
    this.serialNumberArray = [];
    this.especialidadService.obtenerEspecialidades(env.clinicaId, currentPage, pageSize).subscribe((data: DataEspecialidad) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListEspecialidad = data.data;
      this.dataSource = new MatTableDataSource<Iespecialidad>(this.ListEspecialidad);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearEspecialidad();
    } else if (accion.accion == 'Editar') {
      this.editarEspecialidad(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarEspecialidad(accion.fila.especialidadId)
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

  crearEspecialidad() {
    this.bsModalRef = this.modalService.show(AgregarEspecialidadComponent),
    this.bsModalRef.content.especialidadAgregada$.subscribe((especialidadAgregada: boolean) => {
      if (especialidadAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarEspecialidad(especialidad: Iespecialidad) {
    const initialState = {
      especialidadSeleccionada: especialidad.especialidadId
    };
    this.bsModalRef = this.modalService.show(EditarEspecialidadComponent, { initialState });
    const especialidadEditada$ = new Subject<boolean>();
    this.bsModalRef.content.especialidadEditada$ = especialidadEditada$;
    especialidadEditada$.subscribe((especialidadEditada: boolean) => {
      if (especialidadEditada) {
      this.getTableData(this.currentPage, this.pageSize);
    }
  });
    this.bsModalRef.onHidden?.subscribe(() => {
      especialidadEditada$.unsubscribe();   
  });
  }

  eliminarEspecialidad(especialidadId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialidadService.eliminarEspecialidad(especialidadId).subscribe(
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

