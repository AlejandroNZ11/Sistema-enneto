import { Component, OnInit } from '@angular/core';
import { environment as env } from 'src/environments/environments';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { ConsentimientoService } from 'src/app/shared/services/consentimiento.service';
import { AgregarConsentimientoComponent } from './agregar-consentimiento/agregar-consentimiento.component';
import { EditarConsentimientoComponent } from './editar-consentimiento/editar-consentimiento.component';
import { DataConsentimiento, Iconsentimiento, consentimiento } from 'src/app/shared/models/consentimiento';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades  } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consentimiento',
  templateUrl: './consentimiento.component.html',
  styleUrls: ['./consentimiento.component.scss']
})
export class ConsentimientoComponent implements OnInit {
  public routes = routes
  ListConsentimiento: Array<Iconsentimiento> = [];
  columnas: string[] = []
  acciones: string[] = []
  consentimientoSeleccionada: consentimiento = new consentimiento();
  dataSource!: MatTableDataSource<Iconsentimiento>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;

  constructor( 
    private modalService: BsModalService,
    public consentimientoService: ConsentimientoService,
  ) {}

  ngOnInit() {
    this.columnas = getEntityPropiedades ('Consentimiento');
    this.acciones = ['Editar','Eliminar'];
  }

  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListConsentimiento = [];
    this.serialNumberArray = [];
    this.consentimientoService.obtenerConsentimientos(env.clinicaId, currentPage, pageSize).subscribe((data: DataConsentimiento) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListConsentimiento = data.data;
      this.dataSource = new MatTableDataSource<Iconsentimiento>(this.ListConsentimiento);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearConsentimiento();
    } else if (accion.accion == 'Editar') {
      this.editarConsentimiento(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarConsentimiento(accion.fila.consentimientoId)
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

  crearConsentimiento() {
  this.bsModalRef = this.modalService.show(AgregarConsentimientoComponent),
  this.bsModalRef.content.consentimientoAgregada$.subscribe((consentimientoAgregada: boolean) => {
    if (consentimientoAgregada) {
      this.getTableData(this.currentPage, this.pageSize);
    }
  });
  }

editarConsentimiento(consentimiento: Iconsentimiento) {
  const initialState = {
    consentimientoSeleccionada: consentimiento.consentimientoId
  };
  this.bsModalRef = this.modalService.show(EditarConsentimientoComponent, { initialState });
  const consentimientoEditada$ = new Subject<boolean>();
    this.bsModalRef.content.consentimientoEditada$ = consentimientoEditada$;
    consentimientoEditada$.subscribe((consentimientoEditada: boolean) => {
      if (consentimientoEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      consentimientoEditada$.unsubscribe();   
    });
  }

  eliminarConsentimiento(consentimientoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.consentimientoService.eliminarConsentimiento(consentimientoId).subscribe(
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
