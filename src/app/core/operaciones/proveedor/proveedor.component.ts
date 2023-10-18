import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { Iproveedor, proveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {
public routes = routes
public ListProveedor: Array<Iproveedor> = [];
proveedorSeleccionado: proveedor = new proveedor();
dataSource!: MatTableDataSource<Iproveedor>;
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
constructor(private modalService: BsModalService, public proveedorService: ProveedorService) {
}
ngOnInit(){
  this.getTableData();
}

private getTableData(): void {
  this.ListProveedor = [];
  this.serialNumberArray = [];
  //this.proveedorService.obtenerProveedores(env.clinicaId,this.currentPage, this.pageSize).subscribe((data: DataProveedor) => {
   // this.totalData = data.totalData
    //for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
   //   const serialNumber = index + 1;
   //   this.serialNumberArray.push(serialNumber);
   // }
   // this.ListProveedor = data.data;
   // this.dataSource = new MatTableDataSource<Iproveedor>(this.ListProveedor);
   // this.calculateTotalPages(this.totalData, this.pageSize);
  //});
}

public searchData(value: any): void {
  this.dataSource.filter = value.trim().toLowerCase();
  this.ListProveedor = this.dataSource.filteredData;
}
public sortData(sort: Sort) {
  const data = this.ListProveedor.slice();

  if (!sort.active || sort.direction === '') {
    this.ListProveedor = data;
  } else {
    this.ListProveedor = data.sort((a, b) => {
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


crearProveedor() {
  this.bsModalRef = this.modalService.show(AgregarProveedorComponent),
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
}
eliminarProveedor(ruc:string){
  Swal.fire({
    title: '¿Estas seguro que deseas eliminar?',
    showDenyButton: true,
    confirmButtonText: 'Eliminar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if(result.isConfirmed){
      this.proveedorService.eliminarProveedor(ruc).subscribe(
        (response) => {
          if (response.isSuccess) {
            Swal.fire('Correcto', 'Proveedor Eliminado en el sistema correctamente.', 'success');
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
public PageSize(): void {
  this.pageSelection = [];
  this.limit = this.pageSize;
  this.skip = 0;
  this.currentPage = 1;
  this.getTableData();
}




}

