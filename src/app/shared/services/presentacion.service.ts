import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataPresentacion, Ipresentacion, presentacion } from '../models/presentacion';
@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerPresentacion(clinicaId: string,page: number, rows: number): Observable<DataPresentacion> {
    return this.http.get<DataPresentacion>(this.apiUrl + `/Presentacion/GetAllPresentacion?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearPresentacion(presentacion: presentacion): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Presentacion/SavePresentacion', presentacion).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarPresentacion(presentacion: Ipresentacion): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Presentaciones/${presentacion.presentacionId}`, presentacion).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}
