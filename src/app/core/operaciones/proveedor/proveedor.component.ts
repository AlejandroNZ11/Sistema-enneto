import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { Iproveedor, proveedor } from 'src/app/shared/models/proveedor';
import { routes } from 'src/app/shared/routes/routes';
import { ProveedorService } from 'src/app/shared/services/proveedor.service';
import { AgregarProveedorComponent } from './agregar-proveedor/agregar-proveedor.component';
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
ngOnInit() {
 
}

getTableData(){}

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
crearProveedor() {
  this.bsModalRef = this.modalService.show(AgregarProveedorComponent),
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
}





}

