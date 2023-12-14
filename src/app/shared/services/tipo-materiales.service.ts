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
    return this.http.get<DataTipomateriales>(this.apiUrl + `/TiposMateriales/GetAllTipoMaterial?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearTipomateriales(tipomateriales: tipomateriales): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/TiposMateriales/SaveTipoMaterial', tipomateriales).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerTipomateriale( tipomaterialId: string): Observable<Itipomateriales> {
    return this.http.get<Itipomateriales>(this.apiUrl + `/TiposMateriales/GetTipoMaterial/${tipomaterialId}`);
  }
  eliminarTipomateriales( tipomaterialId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/TiposMateriales/DeleteTipoMaterial/${tipomaterialId}`);
  }
  actualizarTipomateriales(tipomateriales: Itipomateriales): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/TiposMateriales/UpdateTipoMaterial/${tipomateriales.tipoMaterialId}`, tipomateriales).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}