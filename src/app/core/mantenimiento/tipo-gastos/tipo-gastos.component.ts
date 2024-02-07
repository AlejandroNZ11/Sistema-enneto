import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { AgregarTipoGastosComponent } from './agregar-tipo-gastos/agregar-tipo-gastos.component';
import { EditarTipoGastosComponent } from './editar-tipo-gastos/editar-tipo-gastos.component';
import { DataConceptoGasto, IConceptoGasto, ConceptoGasto } from 'src/app/shared/models/tipogastos';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-gastos',
  templateUrl: './tipo-gastos.component.html',
  styleUrls: ['./tipo-gastos.component.scss']
})
export class TipoGastosComponent implements OnInit {
  public routes = routes;
  ListConceptoGasto: Array<IConceptoGasto> = [];
  columnas: string[] = [];
  acciones: string[] = [];
  conceptoGastoSeleccionado: ConceptoGasto = new ConceptoGasto();
  dataSource!: MatTableDataSource<IConceptoGasto>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  

  constructor(private modalService: BsModalService, public tipoGastosService: TipoGastosService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('ConceptoGasto');
    this.acciones = ['Editar', 'Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListConceptoGasto = [];
    this.serialNumberArray = [];
    this.tipoGastosService.obtenerConceptoGastos(env.clinicaId, currentPage, pageSize).subscribe((data: DataConceptoGasto) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListConceptoGasto = data.data;
      this.dataSource = new MatTableDataSource<IConceptoGasto>(this.ListConceptoGasto);
    });
  }


  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearConceptoGasto();
    } else if (accion.accion == 'Editar') {
      this.editarConceptoGasto(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminarConceptoGasto(accion.fila.conceptoGastoId);
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
/////
  crearConceptoGasto() {
    this.bsModalRef = this.modalService.show(AgregarTipoGastosComponent);
    this.bsModalRef.content.tipoConceptoAgregado$.subscribe((tipoConceptoAgregado: boolean) => {
      if (tipoConceptoAgregado) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
/////
  editarConceptoGasto(conceptoGasto: IConceptoGasto) {
    const initialState = {
      conceptoGastoSeleccionado: conceptoGasto
    };
    this.bsModalRef = this.modalService.show(EditarTipoGastosComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }


  eliminarConceptoGasto(conceptoGastoId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoGastosService.eliminarConceptoGasto(conceptoGastoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Concepto de Gasto eliminado en el sistema correctamente.', 'success');
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
