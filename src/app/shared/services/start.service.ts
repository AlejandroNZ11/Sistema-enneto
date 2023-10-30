import { Injectable, InjectionToken, inject} from '@angular/core';
import { UserLogedResponse } from '../models/user-logged/user-loged-response';
import { UserLogged } from '../models/user-logged/internal/user-logged';
import { EmpresaService } from './empresa.service';
import { catchError, of, shareReplay, take, takeUntil, tap } from 'rxjs';


export type UserInit= {
  logged: UserLogedResponse,
  local?: UserLogged | null
}

@Injectable({
  providedIn: 'root'
})
export class StartService {
  #empresa = inject(EmpresaService);
  private userInit: UserLogedResponse | null = null;
  public userInit$ = this.#empresa.obtenerDatosEmpresa()
  .pipe(
    catchError(()=> of(null)),
    tap( user => this.userInit = user),
    shareReplay(1),
    take(1),
  );
  getUser(): UserLogedResponse {
    return this.userInit!
  }
}

export const USER_INIT = new InjectionToken("USER_INIT",{
  providedIn: 'root',
  factory: ()=> inject(StartService).getUser(),
})






