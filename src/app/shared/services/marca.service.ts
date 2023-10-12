
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataMarca, Imarca, marca } from '../models/marca';
@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerMarca(clinicaId: string,page: number, rows: number): Observable<DataMarca> {
    return this.http.get<DataMarca>(this.apiUrl + `/Marca/GetAllMarca?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearMarca(marca: marca): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Marca/SaveMarca', marca).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarMarca(marca: Imarca): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Marca/${marca.marcaId}`, marca).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}

