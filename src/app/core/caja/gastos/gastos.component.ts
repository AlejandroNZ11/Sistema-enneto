import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSelection} from 'src/app/shared/models/models';
import { GastosService } from 'src/app/shared/services/gastos.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { environment as env} from 'src/environments/environments';
import { DataGastos, Igastos, Gastos, IcontrolGasto, DataControlGasto } from 'src/app/shared/models/gastos';
import { AgregarGastosComponent } from './agregar-gastos/agregar-gastos.component';
import { EditarGastosComponent } from './editar-gastos/editar-gastos.component';
import { Accion, PageSize, Paginacion, getEntityPropiedades } from 'src/app/shared/models/tabla-columna';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { IConceptoGasto } from 'src/app/shared/models/tipogastos';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {
  public routes = routes;
  public GastosList: Array<Igastos> = [];
  dataSource!: MatTableDataSource<Igastos>;
  public showFilter = false;
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  @ViewChild('multiUserSearch') multiGastoSearchInput !: ElementRef;
  gastoSeleccionado!: string;
  listGastoFiltrados!: IConceptoGasto[]
  tiposGasto!: IConceptoGasto[];
  listEstados!: IConceptoGasto[];
  estadoSeleccionado = 'todos';
  fechaInicio = new Date();
  fechaFin = new Date();
  isLoading = false;
  mostrarOpciones = false;
  
  //gastoSeleccionado: Gastos = new Gastos();
  public gasto = '';
  public tipoGasto = '';
  columnas: string[] = []
  acciones: string[] = []
  bsModalRef?: BsModalRef;
  //limit: number = this.pageSize;

  constructor(
    private modalService: BsModalService, 
    private gastosservice: GastosService,
    public tipogastoservice: TipoGastosService,

  ){}
  

  ngOnInit() {
    this.tipogastoservice.obtenerConceptoGastoList().subscribe(data => { this.tiposGasto = data; })
    this.obtenerGastos(); 
  }
  


  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerGastos();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.obtenerGastos();
    }
  }
  
  crearGasto() {
    this.bsModalRef = this.modalService.show(AgregarGastosComponent),
    this.bsModalRef.content.gastoAgregada$.subscribe((gastoAgregada: boolean) => {
    if (gastoAgregada) {
          this.obtenerGastos()
        }
    });
  }

  editarGasto(gasto: Igastos) {
    const initialState = {
      gastoSeleccionada: gasto.gastoId
    };
    this.bsModalRef = this.modalService.show(EditarGastosComponent, { initialState });
    const gastoEditada$ = new Subject<boolean>();
    this.bsModalRef.content.gastoEditada$ = gastoEditada$;
    gastoEditada$.subscribe((gastoEditada: boolean) => {
        if (gastoEditada) {
          this.obtenerGastos()
        }
    });
    this.bsModalRef.onHidden?.subscribe(() => {
      gastoEditada$.unsubscribe();   
    });
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
              this.obtenerGastos()
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

  obtenerGastos() {
    this.GastosList = [];
    this.serialNumberArray = [];
    this.isLoading = true;
    const inicio = this.fechaInicio.toISOString().split('T')[0]
    const fin = this.fechaFin.toISOString().split('T')[0]
    this.gastosservice.obtenerControlGastos(this.currentPage, this.pageSize, inicio, fin, this.gastoSeleccionado, this.estadoSeleccionado).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe((data: DataGastos) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.dataSource = new MatTableDataSource<Igastos>(this.GastosList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    })
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
  buscargasto() {
    const searchInput = this.multiGastoSearchInput.nativeElement.value
      ? this.multiGastoSearchInput.nativeElement.value.toLowerCase()
      : '';
    this.mostrarOpciones = searchInput.length >= 3;
    if (this.mostrarOpciones) {
      if (!this.listGastoFiltrados) {
        this.listGastoFiltrados = [...this.tiposGasto];
      }
      this.tiposGasto = this.listGastoFiltrados.filter((conceptogasto) => {
        const nombres = conceptogasto.nombre.toLowerCase();
        if (!searchInput) {
          return true;
        }
        return nombres.includes(searchInput);
      });
    }
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.serialNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.serialNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  
  public sortData(sort: Sort) {
    const data = this.GastosList.slice();
    if (!sort.active || sort.direction === '') {
      this.GastosList = data;
    } else {
      this.GastosList = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  
  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.obtenerGastos();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.obtenerGastos();
  }
  formatoFecha(fecha:string) :string{
    const [anio,mes,dia] =  fecha.toString().split('T')[0].split('-');
    return `${dia}/${mes}/${anio}`;
  }
}
