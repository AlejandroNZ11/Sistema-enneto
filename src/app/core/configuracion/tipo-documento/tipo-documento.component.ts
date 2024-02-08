import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TipoDocumentoService } from 'src/app/shared/services/tipo-documento.service';
import { AgregarDocumentoComponent } from './agregar-documento/agregar-documento.component';
import { EditarDocumentoComponent } from './editar-documento/editar-documento.component';
import { DataTipoDocumento, ITipoDocumento, TipoDocumento } from 'src/app/shared/models/tipodocumento';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})

export class TipoDocumentoComponent implements OnInit {
  public routes = routes;
  ListTipoDocumento: Array<ITipoDocumento> = [];
  columnas: string[] = []
  acciones: string[] = []
  documentoSeleccionado: TipoDocumento = new TipoDocumento();
  dataSource!: MatTableDataSource<ITipoDocumento>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  
  constructor(private modalService: BsModalService, public tipoDocumentoService: TipoDocumentoService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('TipoDocumento');
    this.acciones = ['Editar', 'Eliminar'];
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipoDocumento = [];
    this.serialNumberArray = [];
    this.tipoDocumentoService.obtenerTiposDocumento(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipoDocumento) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipoDocumento = data.data;
      this.dataSource = new MatTableDataSource<ITipoDocumento>(this.ListTipoDocumento);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTipoDocumento();
    } else if (accion.accion == 'Editar') {
      this.editarTipoDocumento(accion.fila);
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTipoDocumento(accion.fila.tipoDocumentoId);
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearTipoDocumento() {
    this.bsModalRef = this.modalService.show(AgregarDocumentoComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  editarTipoDocumento(tipoDocumento: ITipoDocumento) {
    const initialState = {
      documentoSeleccionado: tipoDocumento.tipoDocumentoId
    };
    this.bsModalRef = this.modalService.show(EditarDocumentoComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarTipoDocumento(tipoDocumentoId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoDocumentoService.eliminarTipoDocumento(tipoDocumentoId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Tipo de Documento eliminado en el sistema correctamente.', 'success');
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