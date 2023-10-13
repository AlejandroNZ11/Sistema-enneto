import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipomateriales, Itipomateriales, tipomateriales } from '../models/tipo-materiales';
@Injectable({
  providedIn: 'root'
})
export class TipomaterialesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerTipomateriales(clinicaId: string, page: number, rows: number): Observable<DataTipomateriales> {
    return this.http.get<DataTipomateriales>(this.apiUrl + `/Tipomateriales/GetAllTipomateriales?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearTipomateriales(tipomateriales: tipomateriales): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Tipomateriales/SaveTipomateriales', tipomateriales).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerTipomateriale( tipomaterialesId: string): Observable<Itipomateriales> {
    return this.http.get<Itipomateriales>(this.apiUrl + `/Tipomateriales/GetTipomateriales/${tipomaterialesId}`);
  }
  eliminarTipomateriales( tipomaterialesId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Tipomateriales/DeleteTipomateriales/${tipomaterialesId}`);
  }
  actualizarTipomateriales(tipomateriales: Itipomateriales): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Tipomateriales/${tipomateriales.tipomaterialesId}`, tipomateriales).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}