import { Injectable, inject } from '@angular/core';
import { UserLogged } from '../models/user-logged/internal/user-logged';
import { InternalSucursal, SelectedSucursal, findSelected } from '../models/user-logged/internal/internal-sucursal';
import { UserLoggedConfiguration } from '../models/user-logged/user-logged-configuration';
import { Empresa } from '../models/user-logged/internal/empresa';
import { BranchWareHouse, UserLogedResponse, UsuarioData } from '../models/user-logged/user-loged-response';
import { Flags } from '../models/user-logged/flags';
import { fromResponse as fromSucursal } from '../models/user-logged/internal/internal-sucursal';
import { StartService, USER_INIT } from './start.service';
import { InternalAlmacen } from '../models/user-logged/internal/internal-almacen';
@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {
  #usuario = inject(USER_INIT);
  sucursales!: InternalSucursal[];
  usuario!: UsuarioData;
  currents!: BranchWareHouse;
  selectedSucursal !: SelectedSucursal;
  selectedAlmacen !: InternalAlmacen;
  constructor() {
    if (this.#usuario) {
      this.sucursales = this.#usuario.sucursales as InternalSucursal[];
      this.usuario = this.#usuario.usuario;
      this.currents = this.#usuario.currents;
      this.selectedSucursal = this.sucursales.find(s => s.isDefault) as SelectedSucursal;
      const s = this.sucursales.findIndex(s => s.isDefault);
      if (s != -1) {
        this.sucursales.splice(s, 1);
        this.sucursales.splice(0, 0, this.selectedSucursal);
      }
      this.selectedAlmacen = this.selectedSucursal.almacenes[0];
      this.#usuario.currents.currentBranch = this.selectedSucursal.id;
      this.#usuario.currents.currentBranchName = this.selectedSucursal.nombre;
      this.#usuario.currents.currentWareHouse = this.selectedAlmacen.id;
      this.#usuario.currents.currentWareHouseName = this.selectedAlmacen.nombre;
      localStorage.setItem('User', JSON.stringify(this.#usuario));
    }
  }
  cambiarSucursal(sucursal: string) {
    this.selectedSucursal = this.sucursales.find(s => s.nombre === sucursal) as SelectedSucursal;
    this.selectedAlmacen = this.selectedSucursal.almacenes[0];
    this.#usuario.currents.currentBranch = this.selectedSucursal.id;
    this.#usuario.currents.currentBranchName = this.selectedSucursal.nombre;
    this.#usuario.currents.currentWareHouse = this.selectedAlmacen.id;
    this.#usuario.currents.currentWareHouseName = this.selectedAlmacen.nombre;
    localStorage.setItem('User', JSON.stringify(this.#usuario));
  }
}
