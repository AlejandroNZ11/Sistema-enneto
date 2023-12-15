import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { AgregarMedidaComponent } from './agregar-medida/agregar-medida.component';
import { EditarMedidaComponent } from './editar-medida/editar-medida.component';
import { DataMedida, Imedida, medida } from 'src/app/shared/models/medida';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-medida',
  templateUrl: './medida.component.html',
  styleUrls: ['./medida.component.scss']
})
export class MedidaComponent implements OnInit{
  public routes = routes;
  ListMedida: Array<Imedida> = [];
  columnas: string[] = []
  acciones: string[] = []
  medidaSeleccionada: medida= new medida();
  dataSource!: MatTableDataSource<Imedida>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public medidaService: MedidaService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Medida');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListMedida = [];
    this.serialNumberArray = [];
    this.medidaService.obtenerMedidas(env.clinicaId, currentPage, pageSize).subscribe((data: DataMedida) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListMedida = data.data;
      this.dataSource = new MatTableDataSource<Imedida>(this.ListMedida);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearMedida();
    } else if (accion.accion == 'Editar') {
      this.editarMedida(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarMedida(accion.fila.unidadMedidaId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearMedida() {
    this.bsModalRef = this.modalService.show(AgregarMedidaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarMedida(medida: Imedida) {
    const initialState = {
      medidaSeleccionada: medida.unidadMedidaId
    };
    this.bsModalRef = this.modalService.show(EditarMedidaComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarMedida(unidadMedidaId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.medidaService.eliminarMedida(unidadMedidaId).subscribe(
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

