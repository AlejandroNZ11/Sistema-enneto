import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoDocumento, ITipoDocumento, TipoDocumento } from '../models/tipodocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) {}

  obtenerTiposDocumento(clinicaId: string, page: number, rows: number): Observable<DataTipoDocumento> {
    return this.http.get<DataTipoDocumento>(`${this.apiUrl}/TiposDocumentos/GetAllTiposDocumento?clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearTipoDocumento(tipoDocumento: TipoDocumento): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TiposDocumentos/SaveTiposDocumento`, tipoDocumento).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerTipoDocumento(tipoDocumentoId: string): Observable<ITipoDocumento> {
    return this.http.get<ITipoDocumento>(`${this.apiUrl}/TiposDocumentos/GetTipoDocumento/${tipoDocumentoId}`);
  }

  eliminarTipoDocumento(tipoDocumentoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/TiposDocumentos/DeleteTipoDocumento/${tipoDocumentoId}`);
  }

  actualizarTipoDocumento(tipoDocumento: ITipoDocumento): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TiposDocumentos/UpdateTipoDocumento/${tipoDocumento.tipoDocumentoId}`, tipoDocumento).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
