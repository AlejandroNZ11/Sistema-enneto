import { Component, OnInit } from '@angular/core';
import { EditarTipoConceptoComponent } from './editar-tipo-concepto/editar-tipo-concepto.component';
import { AgregarTipoConceptoComponent } from './agregar-tipo-concepto/agregar-tipo-concepto.component';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { DataTipoConcepto, ItipoConcepto, tipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { environment as env } from 'src/environments/environments';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-tipo-concepto',
  templateUrl: './tipo-concepto.component.html',
  styleUrls: ['./tipo-concepto.component.scss']
})
export class TipoConceptoComponent implements OnInit{
  public routes = routes;
  ListtipoConcepto: Array<ItipoConcepto> = [];
  columnas: string[] = []
  acciones: string[] = []
  tipoConceptoSeleccionada: tipoConcepto = new tipoConcepto();
  dataSource!: MatTableDataSource<ItipoConcepto>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public tipoConceptoService: TipoConceptoService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('TipoConcepto');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListtipoConcepto = [];
    this.serialNumberArray = [];
    this.tipoConceptoService.obtenerTiposConceptos(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipoConcepto) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListtipoConcepto = data.data;
      this.dataSource = new MatTableDataSource<ItipoConcepto>(this.ListtipoConcepto);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTipoConcepto();
    } else if (accion.accion == 'Editar') {
      this.editarTipoConcepto(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTipoConcepto(accion.fila.tipoConceptoId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearTipoConcepto() {
    this.bsModalRef = this.modalService.show(AgregarTipoConceptoComponent);
  
    this.bsModalRef.content.tipoConceptoAgregada$.subscribe((tipoConceptoAgregada: boolean) => {
      if (tipoConceptoAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarTipoConcepto(tipoConcepto: ItipoConcepto) {
    const initialState = {
      tipoConceptoSeleccionada: tipoConcepto.tipoConceptoId
    };
  
    this.bsModalRef = this.modalService.show(EditarTipoConceptoComponent, { initialState });
    const tipoConceptoEditada$ = new Subject<boolean>();
    this.bsModalRef.content.tipoConceptoEditada$ = tipoConceptoEditada$;
    tipoConceptoEditada$.subscribe((tipoConceptoEditada: boolean) => {
      if (tipoConceptoEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      tipoConceptoEditada$.unsubscribe();   
    });
  }
  eliminarTipoConcepto(TipoConceptoId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoConceptoService.eliminarTipoConcepto(TipoConceptoId).subscribe(
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

