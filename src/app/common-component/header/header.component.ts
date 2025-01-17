import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { SucursalEmpresaRequest } from 'src/app/shared/models/sucursal/sucursal-empresa-request';
import { SucursalAlmacen, SucursalResponse } from 'src/app/shared/models/sucursal/sucursal-response';
import { InternalSucursal } from 'src/app/shared/models/user-logged/internal/internal-sucursal';
import { routes } from 'src/app/shared/routes/routes';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  public openBox = false;
  public miniSidebar = false;
  public addClass = false;
  public selectedValue !: string;
  public sedes!: InternalSucursal[];

  constructor(
    public router: Router, private sideBar: SideBarService,
    public auth: AuthService, public userService: UserLoggedService
  ) {
    this.sedes = userService.sucursales;
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    this.userService.cambiarSucursal(selectedValue);
  }
  openBoxFunc() {
    this.openBox = !this.openBox;
    /* eslint no-var: off */
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    if (this.openBox) {
      mainWrapper.classList.add('open-msg-box');
    } else {
      mainWrapper.classList.remove('open-msg-box');
    }
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();

    this.addClass = !this.addClass;
    /* eslint no-var: off */
    var root = document.getElementsByTagName('html')[0];
    /* eslint no-var: off */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var sidebar: any = document.getElementById('sidebar')

    if (this.addClass) {
      root.classList.add('menu-opened');
      sidebar.classList.add('opened');
    }
    else {
      root.classList.remove('menu-opened');
      sidebar.classList.remove('opened');
    }
  }
  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: document.location.origin + '/login'
      }
    })
  }
}
