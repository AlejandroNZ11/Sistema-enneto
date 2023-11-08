import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoPago, ITipoPago, TipoPago } from '../models/tipopago'; 

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerTiposPago(clinicaId: string, page: number, rows: number): Observable<DataTipoPago> {
    return this.http.get<DataTipoPago>(`${this.apiUrl}/TiposPagos/GetAllTipoPago?ClinicaId=${clinicaId}&Page=${page}&Rows=${rows}`);
  }

  crearTipoPago(tipoPago: TipoPago): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TiposPagos/SaveTipoPago`, tipoPago).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerTipoPago(tipoPagoId: string): Observable<ITipoPago> {
    return this.http.get<ITipoPago>(`${this.apiUrl}/TiposPagos/GetAllTipoPago/${tipoPagoId}`);
  }

  eliminarTipoPago(tipoPagoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/TiposPagos/DeleteTipoPago/${tipoPagoId}`);
  }

  actualizarTipoPago(tipoPago: ITipoPago): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TiposPagos/UpdateTipoPago/${tipoPago.tipoPagoId}`, tipoPago).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
