import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoPago, ITipoPago, tipoPago } from '../models/tipopago'; 

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerTiposPago(clinicaId: string, page: number, rows: number): Observable<DataTipoPago> {
    return this.http.get<DataTipoPago>(`${this.apiUrl}/TiposPago/GetAllTipoPago?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearTipoPago(tipoPago: tipoPago): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TiposPago/SaveTipoPago`, tipoPago).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarTipoPago(tipoPago: ITipoPago): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TiposPago/${tipoPago.tipoPagoId}`, tipoPago).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
