import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataGastos, Igastos, Gastos } from '../models/gastos';

@Injectable({
  providedIn: 'root'
})
export class GastosService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerGastos(clinicaId: string, page: number, rows: number,fechaInicio?: string, fechaFin?: string, gasto?: string): Observable<DataGastos> {
    let url = `${this.apiUrl}/Gasto/GetAllGasto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
    if (fechaInicio) {
      url += `&fechaInicio=${fechaInicio}`;
    }
    if (fechaFin) {
      url += `&fechaFin=${fechaFin}`;
    }
    if (gasto) {
      url += `&medico=${gasto}`;
    }
    
    return this.http.get<DataGastos>(url);
  }

crearGastos(gastos: Gastos): Observable<successResponse> {
  return this.http.post<successResponse>(this.apiUrl + '/Gasto/SaveGasto', gastos).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
}
obtenerGasto (gastoId: string): Observable<Igastos> {
  return this.http.get<Igastos>(this.apiUrl + `/Gasto/GetGasto/${gastoId}`);
}
eliminarGastos (gastosId: string): Observable<successResponse> {
  return this.http.delete<successResponse>(this.apiUrl + `/Gasto/DeleteGasto/${gastosId}`);
}
actualizarGastos (gastos: Igastos): Observable<successResponse> {
  return this.http.put<successResponse>(this.apiUrl + `/Gasto/UpdateGasto/${gastos.gastoId}`, gastos).pipe(
      catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
      })
  );
}

}
