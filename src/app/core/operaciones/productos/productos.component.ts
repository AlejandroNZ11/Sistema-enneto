import { Component ,OnInit} from '@angular/core';
import { BsModalRef , BsModalService} from 'ngx-bootstrap/modal';
import { routes } from 'src/app/shared/routes/routes';
import { AgregarProductosComponent } from './agregar-productos/agregar-productos.component';
import { OperacionesService } from 'src/app/shared/services/operaciones.service';
import { MatTableDataSource } from '@angular/material/table';
import { DataProducto, Iproducto, producto } from 'src/app/shared/models/producto';
import Swal from 'sweetalert2';
import { pageSelection } from 'src/app/shared/models/models';
import { Sort } from '@angular/material/sort';
import { environment as env } from 'src/environments/environments';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  constructor(public ProductosService:OperacionesService,
    private modalService:BsModalService) { }


  ngOnInit(): void {
    this.getTableData(); 
  }

  public routes = routes;
  public ListProducto: Array<Iproducto> = [];
  productoSeleccionado: producto = new producto();
  dataSource!: MatTableDataSource<Iproducto>;
  public showFilter = false;
  public searchDataValue = '';
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
  bsModalRef?: BsModalRef;
  

  private getTableData(): void {
    this.ListProducto = [];
    this.serialNumberArray = [];
    this.ProductosService.obtenerProductos(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataProducto) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListProducto = data.data;
      this.dataSource = new MatTableDataSource<Iproducto>(this.ListProducto);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }
  
  eliminarProducto(id:string){
    Swal.fire({
      title: '¿Estas seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if(result.isConfirmed){
        this.ProductosService.eliminarProducto(id).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Producto eliminado en el sistema correctamente.', 'success');
              this.getTableData();
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

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListProducto = this.dataSource.filteredData;
  }
  
  crearProducto() {
    this.bsModalRef = this.modalService.show(AgregarProductosComponent),
      this.bsModalRef.onHidden?.subscribe(() => {
        this.getTableData();
      });
  }
  public sortData(sort: Sort) {
    const data = this.ListProducto.slice();

    if (!sort.active || sort.direction === '') {
      this.ListProducto = data;
    } else {
      this.ListProducto = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
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
    this.getTableData();
  }
  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }
  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
  
}