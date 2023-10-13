import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataMoneda, IMoneda, Moneda } from '../models/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerMonedas(clinicaId: string, page: number, rows: number): Observable<DataMoneda> {
    return this.http.get<DataMoneda>(`${this.apiUrl}/Monedas/GetAllMoneda?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearMoneda(moneda: Moneda): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/Monedas/SaveMoneda`, moneda).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerMoneda(monedaId: string): Observable<IMoneda> {
    return this.http.get<IMoneda>(`${this.apiUrl}/Monedas/GetMoneda/${monedaId}`);
  }

  eliminarMoneda(monedaId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/Monedas/DeleteMoneda/${monedaId}`);
  }

  actualizarMoneda(moneda: IMoneda): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/Monedas/${moneda.monedaId}`, moneda).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
