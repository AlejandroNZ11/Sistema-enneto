import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, filter, first, map, switchMap } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';
import Locals from 'ngx-editor/lib/Locals';

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private empresaService: EmpresaService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthenticated$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.canPass())
    );
  }
  canPass(): Observable<boolean> {
    return this.empresaService
      .obtenerDatosEmpresa()
      .pipe(
        map(user => { localStorage.setItem('User',JSON.stringify(user))
          return true;
        })
      );
  }
}
