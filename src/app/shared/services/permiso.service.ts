import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPermiso, IPermiso, Permiso } from '../models/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerPermisos(clinicaId: string, page: number, rows: number): Observable<DataPermiso> {
    return this.http.get<DataPermiso>(`${this.apiUrl}/Permisos/GetAllPermiso?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearPermiso(permiso: Permiso): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/Permisos/SavePermiso`, permiso).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerPermiso(permisoId: string): Observable<IPermiso> {
    return this.http.get<IPermiso>(`${this.apiUrl}/Permisos/GetPermiso/${permisoId}`);
  }

  eliminarPermiso(permisoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/Permisos/DeletePermiso/${permisoId}`);
  }

  actualizarPermiso(permiso: IPermiso): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/Permisos/UpdatePermiso/${permiso.permisoId}`, permiso).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
