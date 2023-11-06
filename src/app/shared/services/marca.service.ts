
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

  obtenerMarcas(clinicaId: string, page: number, rows: number): Observable<DataMarca> {
    return this.http.get<DataMarca>(this.apiUrl + `/MarcasMateriales/GetAllMarcaMaterial?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearMarca(marca: marca): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/MarcasMateriales/SaveMarcaMaterial', marca).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  obtenerMarca( MarcaMaterialId: string): Observable<Imarca> {
    return this.http.get<Imarca>(this.apiUrl + `/MarcasMateriales/GetMarcaMaterial/${MarcaMaterialId}`);
  }
  eliminarMarca( MarcaMaterialId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/MarcasMateriales/DeleteMarcaMaterial/${MarcaMaterialId}`);
  }
  actualizarMarca(marca: Imarca): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/MarcasMateriales/UpdateMarcaMaterial/${marca.marcaMaterialesId}`, marca).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}