import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection} from 'src/app/shared/models/models';
import { GastosService } from 'src/app/shared/services/gastos.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { environment as env} from 'src/environments/environments';
import { DataGastos, Igastos, Gastos } from 'src/app/shared/models/gastos';
//import { AgregarGastoComponent } from './agregar-gasto/agregar-gasto.component';
//import { EditarGastoComponent } from './editar-gasto/editar-gasto.component';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  public routes = routes;
  public GastosList: Array<Igastos> = [];
  dataSource!: MatTableDataSource<Igastos>;
  gastoSeleccionado: Gastos = new Gastos();
  public gasto = '';
  public fechaInicio = '';
  public fechaFin = '';
  columnas: string[] = []
  acciones: string[] = []
  pageSize = PageSize.size;
  totalData = 0;
  skip = 0;
  serialNumberArray: Array<number> = [];
  currentPage = 1;
  bsModalRef?: BsModalRef;
  limit: number = this.pageSize;
  isLoading = false;

  constructor(
    private modalService: BsModalService, 
    public gastosservice: GastosService,

  ){}

  ngOnInit() {
    this.columnas = getEntityPropiedades('Gasto');
    this.acciones = ['Editar', 'Eliminar'];
  }
  

  private getTableData(currentPage: number, pageSize: number): void {
    this.GastosList = [];
    this.serialNumberArray = [];
    this.gastosservice.obtenerGastos(env.clinicaId, currentPage, pageSize).subscribe((data: DataGastos) => {
        this.totalData = data.totalData
        for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
            const serialNumber = index + 1;
            this.serialNumberArray.push(serialNumber);
        }
        this.GastosList = data.data;
        this.dataSource = new MatTableDataSource<Igastos>(this.GastosList);
    });
  }


  onAction(accion: Accion) {
    if (accion.accion == 'Crear') {
    //    this.crearGasto();
    } else if (accion.accion == 'Editar') {
   //     this.editarGasto(accion.fila)
    } else if (accion.accion == 'Eliminar') {
        this.eliminarGasto(accion.fila.gastoId)
    }
  }
  getMoreData(pag: Paginacion) {
    this.getTableData(pag.page, pag.size);
    this.currentPage = pag.page;
    this.pageSize = pag.size;
    this.skip = pag.skip;
    this.limit = pag.limit;
  }
  // crearGasto() {
  //   this.bsModalRef = this.modalService.show(AgregarGastoComponent),
  //   this.bsModalRef.content.gastoAgregada$.subscribe((gastoAgregada: boolean) => {
  //   if (gastoAgregada) {
  //       this.getTableData(this.currentPage, this.pageSize);
  //       }
  //   });
  // }
  // editarGasto(gasto: Igastos) {
  //   const initialState = {
  //     gastoSeleccionada: gasto.gastoId
  //   };
  //   this.bsModalRef = this.modalService.show(EditarGastoComponent, { initialState });
  //   const gastoEditada$ = new Subject<boolean>();
  //   this.bsModalRef.content.gastoEditada$ = gastoEditada$;
  //   gastoEditada$.subscribe((gastoEditada: boolean) => {
  //       if (gastoEditada) {
  //           this.getTableData(this.currentPage, this.pageSize);
  //       }
  //   });
  //   this.bsModalRef.onHidden?.subscribe(() => {
  //     gastoEditada$.unsubscribe();   
  //   });
  // }


  formatoFecha(fecha:string) :string{
    const [anio,mes,dia] =  fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }

  eliminarGasto(gastosId:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.gastosservice.eliminarGastos(gastosId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire(response.message, '', 'success');
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
