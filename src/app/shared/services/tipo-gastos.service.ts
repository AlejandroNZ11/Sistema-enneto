import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoGastos, ITipoGastos, TipoGastos } from '../models/tipogastos';

@Injectable({
  providedIn: 'root'
})
export class TipoGastosService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerTipoGastos(clinicaId: string, page: number, rows: number): Observable<DataTipoGastos> {
    return this.http.get<DataTipoGastos>(`${this.apiUrl}/TipoGastos/GetAllTipoGastos?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearTipoGasto(tipoGastos: TipoGastos): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TipoGastos/SaveTipoGastos`, tipoGastos).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerTipoGasto(tipoGastosId: string): Observable<ITipoGastos> {
    return this.http.get<ITipoGastos>(`${this.apiUrl}/TipoGastos/GetTipoGastos/${tipoGastosId}`);
  }

  eliminarTipoGasto(tipoGastosId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/TipoGastos/DeleteTipoGastos/${tipoGastosId}`);
  }

  actualizarTipoGasto(tipoGastos: ITipoGastos): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TipoGastos/${tipoGastos.tipoGastosId}`, tipoGastos).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
