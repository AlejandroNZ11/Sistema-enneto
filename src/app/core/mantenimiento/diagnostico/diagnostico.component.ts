import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DataDiagnostico, Idiagnostico, diagnostico } from 'src/app/shared/models/diagnostico';
import { routes } from 'src/app/shared/routes/routes';
import { DiagnosticoService } from 'src/app/shared/services/diagnostico.service';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { CrearDiagnosticoComponent } from './crear-diagnostico/crear-diagnostico.component';
import { Sort } from '@angular/material/sort';
import { pageSelection } from 'src/app/shared/models/models';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent {
  public routes = routes;
  ListDiagnostico: Array<Idiagnostico> = [];
  columnas: string[] = []
  acciones: string[] = []
  diagnosticoSeleccionado: diagnostico = new diagnostico();
  dataSource!: MatTableDataSource<Idiagnostico>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public diagnosticoService: DiagnosticoService) {
  }
  ngOnInit(): void {
    this.columnas = getEntityPropiedades('Diagnostico');
    this.acciones = ['Eliminar'];

  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListDiagnostico= [];
    this.serialNumberArray = [];
    this.diagnosticoService.obtenerDiagnosticos(env.clinicaId, currentPage, pageSize).subscribe((data: DataDiagnostico) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListDiagnostico = data.data;
      this.dataSource = new MatTableDataSource<Idiagnostico>(this.ListDiagnostico);
    });
  }
  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  crearDiagnostico() {
    this.bsModalRef = this.modalService.show(CrearDiagnosticoComponent),
    this.bsModalRef.content.diagnosticoAgregado$.subscribe((diagnosticoAgregado: boolean) => {
      if (diagnosticoAgregado) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListDiagnostico = this.dataSource.filteredData;
  }


  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearDiagnostico();
    }  else if (accion.accion == 'Eliminar') {
      this.eliminarDiagnostico(accion.fila.enfermedadId)
    } else if (accion.accion == 'Refresh') {
      this.refreshData();
    }

  }
  
  eliminarDiagnostico(enfermedadId:string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.diagnosticoService.eliminarDiagnostico(enfermedadId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message,'', 'success');
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

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
}
