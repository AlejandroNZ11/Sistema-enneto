import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataUnidad, Iunidad, unidad } from '../models/unidades';
@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerUnidades(clinicaId: string, page: number, rows: number): Observable<DataUnidad> {
    return this.http.get<DataUnidad>(this.apiUrl + `/Unidades/GetAllUnidad?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearUnidad(unidad: unidad): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Unidades/SaveUnidad', unidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerUnidad( unidadId: string): Observable<Iunidad> {
    return this.http.get<Iunidad>(this.apiUrl + `/Unidades/GetUnidad/${unidadId}`);
  }
  eliminarUnidad( unidadId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Unidades/DeleteUnidad/${unidadId}`);
  }
  actualizarUnidad(unidad: Iunidad): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Unidades/UpdateUnidad/${unidad.unidadId}`, unidad).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}