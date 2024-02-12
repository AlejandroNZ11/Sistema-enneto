import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { AlergiasService } from 'src/app/shared/services/alergias.service';
import { AgregarAlergiasComponent } from './agregar-alergias/agregar-alergias.component';
import { EditarAlergiasComponent } from './editar-alergias/editar-alergias.component';
import { DataAlergias, Ialergias, alergias } from 'src/app/shared/models/alergia';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.scss']
})
export class AlergiasComponent implements OnInit{
  public routes = routes;
  ListAlergias: Array<Ialergias> = [];
  columnas: string[] = []
  acciones: string[] = []
  alergiaSeleccionada: alergias = new alergias();
  dataSource!: MatTableDataSource<Ialergias>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public alergiaService: AlergiasService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Alergia');
    this.acciones = ['Editar', 'Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }
  
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListAlergias = [];
    this.serialNumberArray = [];
    this.alergiaService.obtenerAlergias(env.clinicaId, currentPage, pageSize).subscribe((data: DataAlergias) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListAlergias = data.data;
      this.dataSource = new MatTableDataSource<Ialergias>(this.ListAlergias);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearAlergia();
    } else if (accion.accion == 'Editar') {
      this.editarAlergia(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarAlergia(accion.fila.alergiaId)
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

  crearAlergia() {
    this.bsModalRef = this.modalService.show(AgregarAlergiasComponent);
  
    this.bsModalRef.content.alergiaAgregada$.subscribe((alergiaAgregada: boolean) => {
      if (alergiaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarAlergia(Alergias: Ialergias) {
    const initialState = {
      alergiaSeleccionada: Alergias.alergiaId
    };
    this.bsModalRef = this.modalService.show(EditarAlergiasComponent, { initialState });
    const alergiaEditada$ = new Subject<boolean>();
    this.bsModalRef.content.alergiaEditada$ = alergiaEditada$;
    alergiaEditada$.subscribe((alergiaEditada: boolean) => {
      if (alergiaEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      alergiaEditada$.unsubscribe();   
    });
  }
  eliminarAlergia(AlergiaId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.alergiaService.eliminarAlergia(AlergiaId).subscribe(
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

