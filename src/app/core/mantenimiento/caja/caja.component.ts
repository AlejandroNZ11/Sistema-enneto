import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { CajaService } from 'src/app/shared/services/caja.service';
import { AgregarCajaComponent } from './agregar-caja/agregar-caja.component';
import { EditarCajaComponent } from './editar-caja/editar-caja.component';
import { DataCaja, Icaja, caja } from 'src/app/shared/models/caja';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit{
  public routes = routes;
  Listcaja: Array<Icaja> = [];
  columnas: string[] = []
  acciones: string[] = []
  cajaSeleccionada: caja = new caja();
  dataSource!: MatTableDataSource<Icaja>;
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  
  constructor(
    private modalService: BsModalService, 
    public cajaService: CajaService,
    ) {}

  ngOnInit() {
    this.columnas = getEntityPropiedades('Caja');
    this.acciones = ['Editar', 'Eliminar'];
  }

  private getTableData(currentPage: number, pageSize: number): void {
    this.Listcaja = [];
    this.serialNumberArray = [];
    this.cajaService.obtenerCajas(env.clinicaId, currentPage, pageSize).subscribe((data: DataCaja) => {
      this.totalData = data.totalData
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.Listcaja = data.data;
      this.dataSource = new MatTableDataSource<Icaja>(this.Listcaja);
    });
  }
  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
      this.crearCaja();
    } else if (accion.accion == 'Editar') {
      this.editarCaja(accion.fila)
    } else if (accion.accion == 'Eliminar') {
      this.eliminarCaja(accion.fila.cajaId)
    }else if (accion.accion == 'Refresh') {
      this.refreshData();
    }
    
  }
  refreshData() {
    this.getTableData(this.currentPage, this.pageSize);
  }

  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }

  
  crearCaja() {
    this.bsModalRef = this.modalService.show(AgregarCajaComponent);
  
    this.bsModalRef.content.cajaAgregada$.subscribe((cajaAgregada: boolean) => {
      if (cajaAgregada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
  }
  editarCaja(caja: Icaja) {
    const initialState = {
      cajaSeleccionada: caja.cajaId
    };
  
    this.bsModalRef = this.modalService.show(EditarCajaComponent, { initialState });
    const cajaEditada$ = new Subject<boolean>();
    this.bsModalRef.content.cajaEditada$ = cajaEditada$;
    cajaEditada$.subscribe((cajaEditada: boolean) => {
      if (cajaEditada) {
        this.getTableData(this.currentPage, this.pageSize);
      }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      cajaEditada$.unsubscribe();   
    });
  }
  eliminarCaja(cajaId:string){
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.cajaService.eliminarCaja(cajaId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message,'', 'success');
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

