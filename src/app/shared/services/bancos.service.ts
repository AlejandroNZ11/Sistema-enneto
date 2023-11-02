import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataBancos, Ibancos, banco } from '../models/bancos';
@Injectable({
  providedIn: 'root'
})
export class BancosService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerBancos(clinicaId: string, page: number, rows: number): Observable<DataBancos> {
    return this.http.get<DataBancos>(this.apiUrl + `/Bancos/GetAllBanco?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearBanco(banco: banco): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Bancos/SaveBanco', banco).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerBanco( bancoId: string): Observable<Ibancos> {
    return this.http.get<Ibancos>(this.apiUrl + `/Bancos/GetBanco/${bancoId}`);
  }
  eliminarBanco( bancoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Bancos/DeleteBanco/${bancoId}`);
  }
  actualizarBanco(banco: Ibancos): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Bancos/UpdateBanco/${banco.bancoId}`, banco).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}