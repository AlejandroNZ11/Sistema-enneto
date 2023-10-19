import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataRoles, Iroles, roles } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerRoles(clinicaId: string, page: number, rows: number): Observable<DataRoles> {
    return this.http.get<DataRoles>(this.apiUrl + `/Rol/GetAllRol?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearRoll(rol: roles): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Rol/SaveMenu', rol).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerRol( rolesId: string): Observable<Iroles> {
    return this.http.get<Iroles>(this.apiUrl + `/Rol/GetRol/${rolesId}`);
  }
  eliminarRol( rolesId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Rol/DeleteRol/${rolesId}`);
  }
  actualizarRol(rol: Iroles): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Rol/${rol.rolesId}`, rol).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
