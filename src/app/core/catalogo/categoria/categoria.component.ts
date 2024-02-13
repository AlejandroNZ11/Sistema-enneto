import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { DataCategoria, Icategoria, categoria } from 'src/app/shared/models/categoria';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  public routes = routes;
  ListCategoria: Array<Icategoria> = [];
  columnas: string[] = []
  acciones: string[] = []
  categoriaMSeleccionada: categoria = new categoria();
  dataSource!: MatTableDataSource<Icategoria>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(
    private modalService: BsModalService, 
    public categoriaService: CategoriaService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Categoria');
    this.acciones = ['Editar', 'Eliminar'];
  }
  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.ListCategoria = [];
    this.serialNumberArray = [];
    this.categoriaService.obtenerCategorias(env.clinicaId, currentPage, pageSize).subscribe((data: DataCategoria) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListCategoria = data.data;
      this.dataSource = new MatTableDataSource<Icategoria>(this.ListCategoria);
    });
  }

  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearCategoria();
    } else if (accion.accion == 'Editar') {
      this.editarCategoria(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarCategoria(accion.fila.categoriaId)
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
  
  crearCategoria() {
    this.bsModalRef = this.modalService.show(AgregarCategoriaComponent);
  
    this.bsModalRef.content.categoriaAgregada$.subscribe((categoriaAgregada: boolean) => {
      if (categoriaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarCategoria(categoria: Icategoria) {
    const initialState = {
      categoriaSeleccionada: categoria.categoriaId
    };
    this.bsModalRef = this.modalService.show(EditarCategoriaComponent, { initialState });
    const categoriaEditada$ = new Subject<boolean>();
    this.bsModalRef.content.categoriaEditada$ = categoriaEditada$;
    categoriaEditada$.subscribe((categoriaEditada: boolean) => {
      if (categoriaEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      categoriaEditada$.unsubscribe();   
    });
  }

  eliminarCategoria(categoriaId: string) {
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.eliminarCategoria(categoriaId).subscribe(
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
