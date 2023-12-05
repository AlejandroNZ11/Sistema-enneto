import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { pageSelection } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { AgregarUsuarioComponent } from './agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { DataUsuario, IUsuario, Usuario } from 'src/app/shared/models/usuario';
import { environment as env } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public routes = routes;
  public ListUsuario: Array<IUsuario> = [];
  usuarioSeleccionado: Usuario = new Usuario();
  dataSource!: MatTableDataSource<IUsuario>;
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

  public fechaInicio = '';
  public fechaFin = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tiposUsuarios: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public tipoUsuario: any = null;

  constructor(private modalService: BsModalService, public usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.getTableData();
  }

  private getTableData(): void {
    this.ListUsuario = [];
    this.serialNumberArray = [];
    this.usuarioService.obtenerUsuarios(env.clinicaId, this.currentPage, this.pageSize).subscribe((data: DataUsuario) => {
      this.totalData = data.totalData;
      for (let index = this.skip; index < Math.min(this.limit, data.totalData); index++) {
        const serialNumber = index + 1;
        this.serialNumberArray.push(serialNumber);
      }
      this.ListUsuario = data.data;
      this.dataSource = new MatTableDataSource<IUsuario>(this.ListUsuario);
      this.calculateTotalPages(this.totalData, this.pageSize);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.ListUsuario = this.dataSource.filteredData;
  }

  public sortData(sort: Sort) {
    const data = this.ListUsuario.slice();
    if (!sort.active || sort.direction === '') {
      this.ListUsuario = data;
    } else {
      this.ListUsuario = data.sort((a, b) => {
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
    for (let i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  crearUsuario() {
    this.bsModalRef = this.modalService.show(AgregarUsuarioComponent);
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  editarUsuario(usuario: IUsuario) {
    this.bsModalRef = this.modalService.show(EditarUsuarioComponent);
    this.bsModalRef.content.usuarioSeleccionado = usuario.usuarioId;
    this.bsModalRef.onHidden?.subscribe(() => {
      this.getTableData();
    });
  }

  eliminarUsuario(usuarioId: string) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuarioId).subscribe(
          (response) => {
            if (response.isSuccess) {
              Swal.fire('Correcto', 'Usuario eliminado en el sistema correctamente.', 'success');
              this.getTableData();
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
    });
  }
}
