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

  // obtenerGastos(clinicaId: string, page: number, rows: number, conceptoGastoId?: string, fechaInicio?: string, fechaFin?: string): Observable<DataGastos> {
  //   let url = `${this.apiUrl}/Gasto/GetAllGasto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
  //   if (fechaInicio) {
  //     url += `&fechaInicio=${fechaInicio}`;
  //   }
  //   if (fechaFin) {
  //     url += `&fechaFin=${fechaFin}`;
  //   }
  //   if (conceptoGastoId) {
  //     url += `&conceptoGastoId=${conceptoGastoId}`;
  //   }
  //   console.log("Service: " + conceptoGastoId)
  //   return this.http.get<DataGastos>(url);
  // }

  obtenerGastos(clinicaId: string, page: number, rows: number): Observable<DataGastos> {
    return this.http.get<DataGastos>(this.apiUrl + `/Gasto/GetAllGasto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  obtenerControlGastos( page: number, rows: number, fechaInicio?: string, fechaFin?: string, estado?: string,  gasto?: string): Observable<DataGastos> {
    let url = `${this.apiUrl}/Gasto/GetControlGasto?&page=${page}&rows=${rows}&FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`;
    if (estado != 'todos' && estado) {
      url += `&estado=${estado}`;
    }
    if (gasto != 'todos' && gasto) {
      url += `&conceptoGasto=${gasto}`;
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
// obtenerGasto (gastoId: string): Observable<Igastos> {
//   const url = `${this.apiUrl}/Gasto/GetGasto/${gastoId}`;
//     return this.http.get<Igastos>(url);
// }

obtenerGasto( sedeId: string): Observable<Igastos> {
  return this.http.get<Igastos>(this.apiUrl + `/Gasto/GetGasto/${sedeId}`);
}

obtenerGastosList(clinicaId: string, page: number, rows: number, conceptoGastoId?: string, fechaInicio?: string, fechaFin?: string): Observable<DataGastos> {
  let url = `${this.apiUrl}/CitasGasto/GetGastoList?clinicaid=${clinicaId}&page=${page}&rows=${rows}`;
  if (fechaInicio) {
    url += `&fechaInicio=${fechaInicio}`;
  }
  if (fechaFin) {
    url += `&fechaFin=${fechaFin}`;
  }
  if (conceptoGastoId) {
    url += `&conceptoGastoId=${conceptoGastoId}`;
  }
  console.log("Service: " + conceptoGastoId)
  return this.http.get<DataGastos>(url);
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
