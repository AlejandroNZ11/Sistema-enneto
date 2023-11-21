import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataCuenta, Icuenta, cuenta } from '../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCuentas(clinicaId: string, page: number, rows: number): Observable<DataCuenta> {
    return this.http.get<DataCuenta>(this.apiUrl + `/CuentasPagar/GetAllCuentaPagar?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearCuenta(cuenta: cuenta): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/CuentasPagar/SaveCuentaPagar', cuenta).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerCuenta( cuentaId: string): Observable<Icuenta> {
    return this.http.get<Icuenta>(this.apiUrl + `/CuentasPagar/GetCuentaPagar${cuentaId}`);
  }
  eliminarCuenta( cuentaId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/CuentasPagar/DeleteCuentaPagar/${cuentaId}`);
  }
  actualizarCuenta(cuenta: Icuenta): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/CuentasPagar/UpdateCuentaPagar/${cuenta.cuentaPagarId}`, cuenta).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}