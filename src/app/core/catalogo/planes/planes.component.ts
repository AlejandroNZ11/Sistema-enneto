import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { PlanesService } from 'src/app/shared/services/planes.servicie';
import { DataPlanes, Planes, IPlanes } from 'src/app/shared/models/planes';
import { environment as env } from 'src/environments/environments';
import { AgregarPlanComponent } from './agregar-plan/agregar-plan.component';
import { EditarPlanComponent } from './editar-plan/editar-plan.component';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.scss']
})
export class PlanesComponent implements OnInit {
  public routes = routes;
  ListPlanes: Array<IPlanes> = [];
  columnas: string[] = []
  acciones: string[] = []
  planSeleccionado: Planes = new Planes();
  dataSource!: MatTableDataSource<IPlanes>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public planesService: PlanesService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Planes');
    this.acciones = ['Editar', 'Eliminar'];
  }
  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }
  
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListPlanes = [];
    this.serialNumberArray = [];
    this.planesService.obtenerPlanes(env.clinicaId, currentPage, pageSize).subscribe((data: DataPlanes) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListPlanes = data.data;
      this.dataSource = new MatTableDataSource<IPlanes>(this.ListPlanes);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearPlan();
    } else if (accion.accion == 'Editar') {
      this.editarPlan(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarPlan(accion.fila.planId)
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

  crearPlan() {
    this.bsModalRef = this.modalService.show(AgregarPlanComponent);
  
    this.bsModalRef.content.planAgregada$.subscribe((planAgregada: boolean) => {
      if (planAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarPlan(planes: IPlanes) {
    const initialState = {
      planSeleccionado: planes.planId
    };
    this.bsModalRef = this.modalService.show(EditarPlanComponent, { initialState });
    const planEditada$ = new Subject<boolean>();
    this.bsModalRef.content.planEditada$ = planEditada$;
    planEditada$.subscribe((planEditada: boolean) => {
      if (planEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      planEditada$.unsubscribe();   
    });
  }
  eliminarPlan(planId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.planesService.eliminarPlan(planId).subscribe(
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
