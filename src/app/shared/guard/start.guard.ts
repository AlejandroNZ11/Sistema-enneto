import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, filter, first, map, switchMap } from 'rxjs';
import { EmpresaService } from '../services/empresa.service';
import Locals from 'ngx-editor/lib/Locals';
import { StartService } from '../services/start.service';
import { UserLogged } from '../models/user-logged/internal/user-logged';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root'
})
export class StartGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private empresaService: EmpresaService, private startService: StartService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isAuthenticated$.pipe(
      filter(Boolean),
      first(),
      switchMap(() => this.canPass())
    );
  }
  canPass(): Observable<boolean | UrlTree> {
    return this.startService.userInit$
      .pipe(
        map(usuario => {
          if (usuario == null) {
            return this.router.createUrlTree([routes.error500]);
          }
          return true;
        }
        )
      )
  }
}
