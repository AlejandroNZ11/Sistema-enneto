import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataSede, Isede, sede } from '../models/sede';
@Injectable({
  providedIn: 'root'
})
export class SedeService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerSedes(clinicaId: string, page: number, rows: number): Observable<DataSede> {
    return this.http.get<DataSede>(this.apiUrl + `/Sede/GetAllSede?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearSede(sede: sede): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Sede/SaveSede', sede).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerSede( sedeId: string): Observable<Isede> {
    return this.http.get<Isede>(this.apiUrl + `/Sede/GetSede/${sedeId}`);
  }
  eliminarSede( sedeId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Sede/DeleteSede/${sedeId}`);
  }
  actualizarSede(sede: Isede): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Sede/UpdateSede/${sede.sedeId}`, sede).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}