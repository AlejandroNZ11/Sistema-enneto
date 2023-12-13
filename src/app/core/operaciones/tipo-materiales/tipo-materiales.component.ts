import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { TipomaterialesService } from 'src/app/shared/services/tipo-materiales.service';
import { AgregarTipoMaterialesComponent } from './agregar-tipo-materiales/agregar-tipo-materiales.component';
import { EditarTipoMaterialesComponent } from './editar-tipo-materiales/editar-tipo-materiales.component';
import { DataTipomateriales, Itipomateriales, tipomateriales } from 'src/app/shared/models/tipo-materiales';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-tipo-materiales',
  templateUrl: './tipo-materiales.component.html',
  styleUrls: ['./tipo-materiales.component.scss']
})
export class TipoMaterialesComponent implements OnInit{
  public routes = routes;
  ListTipomateriales: Array<Itipomateriales> = [];
  columnas: string[] = []
  acciones: string[] = []
  tipomaterialesSeleccionada: tipomateriales = new tipomateriales();
  dataSource!: MatTableDataSource<Itipomateriales>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public TipomaterialesService: TipomaterialesService) {
  }

  ngOnInit() {
    this.columnas = getEntityPropiedades('Tipomateriales');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListTipomateriales = [];
    this.serialNumberArray = [];
    this.TipomaterialesService.obtenerTipomateriales(env.clinicaId, currentPage, pageSize).subscribe((data: DataTipomateriales) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListTipomateriales = data.data;
      this.dataSource = new MatTableDataSource<Itipomateriales>(this.ListTipomateriales);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearTipomateriales();
    } else if (accion.accion == 'Editar') {
      this.editarTipomateriales(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarTipomateriales(accion.fila.tipomaterialId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearTipomateriales() {
    this.bsModalRef = this.modalService.show(AgregarTipoMaterialesComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarTipomateriales(tipomaterial: Itipomateriales) {
    const initialState = {
      TipomaterialesSeleccionada: tipomaterial.tipomaterialId
    };
    this.bsModalRef = this.modalService.show(EditarTipoMaterialesComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarTipomateriales(tipoMaterialId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.TipomaterialesService.eliminarTipomateriales(tipoMaterialId).subscribe(
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

