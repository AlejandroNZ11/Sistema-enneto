import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { routes } from 'src/app/shared/routes/routes';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { IMoneda, DataMoneda, Moneda } from 'src/app/shared/models/moneda';
import { AgregarMonedaComponent } from './agregar-moneda/agregar-moneda.component';
import { EditarMonedaComponent } from './editar-moneda/editar-moneda.component';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moneda',
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {
  public routes = routes;
  listMonedas: Array<IMoneda> = [];
  columnas: string[] = []
  acciones: string[] = []
  monedaSeleccionada: Moneda = new Moneda();
  dataSource!: MatTableDataSource<IMoneda>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor(private modalService: BsModalService, public monedaService: MonedaService) { }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Moneda');
    this.acciones = ['Editar', 'Eliminar'];
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.listMonedas = [];
    this.serialNumberArray = [];
    this.monedaService.obtenerMonedas(env.clinicaId, currentPage, pageSize).subscribe((data: DataMoneda) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.listMonedas = data.data;
      this.dataSource = new MatTableDataSource<IMoneda>(this.listMonedas);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearMoneda();
    } else if (accion.accion == 'Editar') {
      this.editarMoneda(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarMoneda(accion.fila.tipoMonedaId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearMoneda() {
    this.bsModalRef = this.modalService.show(AgregarMonedaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }

  editarMoneda(moneda: IMoneda) {
    const initialState = {
      monedaSeleccionada: moneda.tipoMonedaId
    };
    this.bsModalRef = this.modalService.show(EditarMonedaComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarMoneda(tipoMonedaId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.monedaService.eliminarMoneda(tipoMonedaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Moneda Eliminada en el sistema correctamente.', 'success');
              this.getTableData(this.currentPage, this.pageSize);
              return;
            } else {
              console.error(response.message);
            }
          },
          (error) => {
            console.error(error);
            Swal.fire('Error', 'Ocurrió un error al actualizar la moneda', 'error');
          });
      } else {
        return;
      }
    })
  }
}
