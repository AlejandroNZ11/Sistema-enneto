import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoConcepto, tipoConcepto } from '../models/tipoConcepto';
@Injectable({
  providedIn: 'root'
})
export class TipoConceptoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerTiposConceptos(clinicaId: string, page: number, rows: number): Observable<DataTipoConcepto> {
    return this.http.get<DataTipoConcepto>(this.apiUrl + `/TiposConceptos/GetAllTipoConcepto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearTipoConcepto(tipoConcepto: tipoConcepto): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/TiposConceptos/SaveTipoConcepto', tipoConcepto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarTipoConcepto(tipoConcepto: any): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/TiposConceptos/${tipoConcepto.id}`, tipoConcepto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
