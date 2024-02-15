import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import { AgregarTarifarioComponent } from './agregar-tarifario/agregar-tarifario.component';
import { EditarTarifarioComponent } from './editar-tarifario/editar-tarifario.component';
import { DataTarifario, Itarifario, tarifario } from 'src/app/shared/models/tarifario';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tarifario',
  templateUrl: './tarifario.component.html',
  styleUrls: ['./tarifario.component.scss']
})
export class TarifarioComponent  {
  public routes = routes;
  ListTarifario: Array<Itarifario> = [];
  columnas: string[] = []
  acciones: string[] = []
  tarifarioSeleccionada: tarifario = new tarifario();
  dataSource!: MatTableDataSource<Itarifario>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public tarifarioService: TarifarioService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Tarifario');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTarifario = [];
    this.serialNumberArray = [];
    this.tarifarioService.obtenerTarifarios(env.clinicaId, currentPage, pageSize).subscribe((data: DataTarifario) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTarifario = data.data;
      this.dataSource = new MatTableDataSource<Itarifario>(this.ListTarifario);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTarifario();
    } else if (accion.accion == 'Editar') {
      this.editarTarifario(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTarifario(accion.fila.tarifarioId)
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

  crearTarifario() {
    this.bsModalRef = this.modalService.show(AgregarTarifarioComponent),
    this.bsModalRef.content.tarifarioAgregada$.subscribe((tarifarioAgregada: boolean) => {
      if (tarifarioAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarTarifario(tarifario: Itarifario) {
    const initialState = {
      tarifarioSeleccionada: tarifario.tarifarioId
    };
    this.bsModalRef = this.modalService.show(EditarTarifarioComponent, { initialState });
    const tarifarioEditada$ = new Subject<boolean>();
    this.bsModalRef.content.tarifarioEditada$ = tarifarioEditada$;
    tarifarioEditada$.subscribe((tarifarioEditada: boolean) => {
      if (tarifarioEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      tarifarioEditada$.unsubscribe();   
    });
  } 

  eliminarTarifario(tarifarioId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tarifarioService.eliminarTarifario(tarifarioId).subscribe(
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

