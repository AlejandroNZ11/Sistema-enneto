import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoCitado, tipoCitado } from '../models/tipoCitado';
@Injectable({
  providedIn: 'root'
})
export class TipoCitadoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerTiposCitados(clinicaId: string, page: number, rows: number): Observable<DataTipoCitado> {
    return this.http.get<DataTipoCitado>(this.apiUrl + `/TiposCitado/GetAllTipoCitado?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearTipoCitado(tipoCitado: tipoCitado): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/TiposCitado/SaveTipoCitado', tipoCitado).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarTipoCitado(tipoCitado: any): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/TiposCitados/${tipoCitado.id}`, tipoCitado).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
