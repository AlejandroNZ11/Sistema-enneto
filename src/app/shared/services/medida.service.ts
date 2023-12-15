import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataMedida, Imedida, medida } from '../models/medida';
@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerMedidas(clinicaId: string, page: number, rows: number): Observable<DataMedida> {
    return this.http.get<DataMedida>(this.apiUrl + `/UnidadesMedida/GetAllUnidadMedida?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearMedida(medida: medida): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/UnidadesMedida/SaveUnidadMedida', medida).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerMedida( medidaId: string): Observable<Imedida> {
    return this.http.get<Imedida>(this.apiUrl + `/UnidadesMedida/GetUnidadMedida/${medidaId}`);
  }
  eliminarMedida( medidaId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/UnidadesMedida/DeleteUnidadMedida/${medidaId}`);
  }
  actualizarMedida(medida: Imedida): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/UnidadesMedida/UdateUnidadMedida/${medida.unidadMedidaId}`, medida).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
