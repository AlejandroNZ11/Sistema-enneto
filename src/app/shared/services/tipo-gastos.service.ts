import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoGasto, ITipoGasto, tipoGasto } from '../models/tipogastos';

@Injectable({
  providedIn: 'root'
})
export class TipoGastosService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerTipoGastos(clinicaId: string, page: number, rows: number): Observable<DataTipoGasto> {
    return this.http.get<DataTipoGasto>(`${this.apiUrl}/TipoGastos/GetAllTipoGasto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearTipoGasto(tipoGasto: tipoGasto): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TipoGastos/SaveTipoGasto`, tipoGasto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerTipoGasto(tipoGastoId: string): Observable<ITipoGasto> {
    return this.http.get<ITipoGasto>(`${this.apiUrl}/TipoGastos/GetTipoGasto/${tipoGastoId}`);
  }

  eliminarTipoGasto(tipoGastoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/TipoGastos/DeleteTipoGasto/${tipoGastoId}`);
  }

  actualizarTipoGasto(tipoGasto: ITipoGasto): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TipoGastos/${tipoGasto.tipoGastoId}`, tipoGasto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
