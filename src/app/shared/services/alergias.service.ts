import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataAlergias, alergias } from '../models/alergia';

@Injectable({
  providedIn: 'root'
})
export class AlergiasService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerAlergias(clinicaId: string, page: number, rows: number): Observable<DataAlergias> {
    return this.http.get<DataAlergias>(this.apiUrl + `/Alergias/GetAllAlergia?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearAlergia(alergia: alergias): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Alergias/SaveAlergia', alergia).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  actualizarAlergia(alergia: any): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Alergias/${alergia.id}`, alergia).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
