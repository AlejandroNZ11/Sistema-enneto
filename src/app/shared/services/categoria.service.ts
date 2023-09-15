import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataCategoria, categoria } from '../models/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCategorias(page: number, rows: number): Observable<DataCategoria> {
    return this.http.get<DataCategoria>(this.apiUrl + `/Categorias/GetAllCategoria?page=${page}&rows=${rows}`);
  }
  crearCategoria(categoria: categoria): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Categorias/SaveCategoria', categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarCategoria(categoria: any): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Categorias/${categoria.id}`, categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}
