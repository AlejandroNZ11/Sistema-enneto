import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaOpService } from 'src/app/shared/services/categoria-op.service';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { DataCategoriaM, IcategoriaM, categoriaM } from 'src/app/shared/models/categoria-op';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit{
  public routes = routes;
  ListCategoriaM: Array<IcategoriaM> = [];
  columnas: string[] = []
  acciones: string[] = []
  categoriaMSeleccionada: categoriaM = new categoriaM();
  dataSource!: MatTableDataSource<IcategoriaM>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public categoriaMService: CategoriaOpService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('categoria');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListCategoriaM = [];
    this.serialNumberArray = [];
    this.categoriaMService.obtenerCategorias(env.clinicaId, currentPage, pageSize).subscribe((data: DataCategoriaM) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListCategoriaM = data.data;
      this.dataSource = new MatTableDataSource<IcategoriaM>(this.ListCategoriaM);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearCategoria();
    } else if (accion.accion == 'Editar') {
      this.editarCategoria(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarCategoria(accion.fila.categoriaMaterialesId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  
  crearCategoria() {
    this.bsModalRef = this.modalService.show(AgregarCategoriaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarCategoria(categoria: IcategoriaM) {
    const initialState = {
      categoriaSeleccionada: categoria.categoriaMaterialesId
    };
    this.bsModalRef = this.modalService.show(EditarCategoriaComponent, { initialState });
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }

  eliminarCategoria(categoriaMaterialesId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaMService.eliminarCategoria(categoriaMaterialesId).subscribe(
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
