import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { MarcaService } from 'src/app/shared/services/marca.service';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import { EditarMarcaComponent } from './editar-marca/editar-marca.component';
import { DataMarca, Imarca, marca } from 'src/app/shared/models/marca';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})

export class MarcaComponent implements OnInit{
  public routes = routes;
  ListMarca: Array<Imarca> = [];
  columnas: string[] = []
  acciones: string[] = []
  marcaSeleccionada: marca = new marca();
  dataSource!: MatTableDataSource<Imarca>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  constructor(private modalService: BsModalService, public marcaService: MarcaService) {
  }
  ngOnInit() {
    this.columnas = getEntityPropiedades('Marca');
    this.acciones = ['Editar', 'Eliminar'];
  }
  private getTableData(currentPage: number, pageSize: number): void {
    this.ListMarca = [];
    this.serialNumberArray = [];
    this.marcaService.obtenerMarcas(env.clinicaId, currentPage, pageSize).subscribe((data: DataMarca) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListMarca = data.data;
      this.dataSource = new MatTableDataSource<Imarca>(this.ListMarca);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearMarca();
    } else if (accion.accion == 'Editar') {
      this.editarMarca(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarMarca(accion.fila.marcaMaterialesId)
    }
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  crearMarca() {
    this.bsModalRef = this.modalService.show(AgregarMarcaComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData(this.currentPage, this.pageSize);
      });
  }
  editarMarca(marca: Imarca) {
    const initialState = {
      marcaSeleccionada: marca.marcaMaterialesId
    }
    this.bsModalRef = this.modalService.show(EditarMarcaComponent, {initialState});
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData(this.currentPage, this.pageSize);
    });
  }
  eliminarMarca(MarcaMaterialId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.marcaService.eliminarMarca(MarcaMaterialId).subscribe(
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
      }else{
        return;
      }
    })
    
  }
}

