import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataApoderado, IApoderado, Apoderado } from '../models/apoderado';

@Injectable({
  providedIn: 'root'
})
export class ApoderadoService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerApoderados(page: number, rows: number): Observable<DataApoderado> {
    return this.http.get<DataApoderado>(`${this.apiUrl}/Apoderados/GetAllApoderado?page=${page}&rows=${rows}`);
  }

  crearApoderado(apoderado: Apoderado): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/Apoderados/SaveApoderado`, apoderado).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerApoderado(apoderadoId: string): Observable<IApoderado> {
    return this.http.get<IApoderado>(`${this.apiUrl}/Apoderados/GetApoderado/${apoderadoId}`);
  }

  eliminarApoderado(apoderadoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/Apoderados/DeleteApoderado/${apoderadoId}`);
  }

  actualizarApoderado(apoderado: IApoderado): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/Apoderados/UpdateApoderado/${apoderado.apoderadoId}`, apoderado).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
