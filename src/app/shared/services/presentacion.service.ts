import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPresentacion, Ipresentacion, presentacion } from '../models/presentacion';
@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerPresentaciones(clinicaId: string, page: number, rows: number): Observable<DataPresentacion> {
    return this.http.get<DataPresentacion>(this.apiUrl + `/Presentaciones/GetAllPresentacion?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearPresentacion(presentacion: presentacion): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Presentaciones/SavePresentacion', presentacion).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerPresentacion( presentacionId: string): Observable<Ipresentacion> {
    return this.http.get<Ipresentacion>(this.apiUrl + `/Presentaciones/GetPresentacion/${presentacionId}`);
  }
  eliminarPresentacion( presentacionId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Presentaciones/DeletePresentacion/${presentacionId}`);
  }
  actualizarPresentacion(presentacion: Ipresentacion): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Presentaciones/UpdatePresentacion/${presentacion.presentacionId}`, presentacion).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}