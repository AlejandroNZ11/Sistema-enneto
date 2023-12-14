import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { SedeService } from 'src/app/shared/services/sede.service';
import { AgregarSedeComponent } from './agregar-sede/agregar-sede.component';
import { EditarSedeComponent } from './editar-sede/editar-sede.component';
import { DataSede, Isede, sede } from 'src/app/shared/models/sede';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})

export class SedeComponent implements OnInit{
  public routes = routes;
  ListSede: Array<Isede> = [];
  columnas: string[] = []
  acciones: string[] = []
  sedeSeleccionada: sede = new sede();
  dataSource!: MatTableDataSource<Isede>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public sedeService: SedeService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Sede');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListSede = [];
    this.serialNumberArray = [];
    this.sedeService.obtenerSedes(env.clinicaId, currentPage, pageSize).subscribe((data: DataSede) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListSede = data.data;
      this.dataSource = new MatTableDataSource<Isede>(this.ListSede);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearSede();
    } else if (accion.accion == 'Editar') {
      this.editarSede(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarSede(accion.fila.sedeId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearSede() {
    this.bsModalRef = this.modalService.show(AgregarSedeComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarSede(sede: Isede) {
    const initialState = {
      sedeSeleccionada: sede.sedeId
    };
    this.bsModalRef = this.modalService.show(EditarSedeComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarSede(sedeId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.sedeService.eliminarSede(sedeId).subscribe(
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

