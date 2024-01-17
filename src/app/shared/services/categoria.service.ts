import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataCategoria, Icategoria, categoria } from '../models/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerCategorias(clinicaId: string,page: number, rows: number): Observable<DataCategoria> {
    return this.http.get<DataCategoria>(this.apiUrl + `/Categorias/GetAllCategoria?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearCategoria(categoria: categoria): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Categorias/SaveCategoria', categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerListaCategoria(): Observable<Icategoria[]> {
    return this.http.get<Icategoria[]>(this.apiUrl + `/Categorias/GetCategoriaList`);
  }

  obtenerCategoria( categoriaId: string): Observable<Icategoria> {
    return this.http.get<Icategoria>(this.apiUrl + `/Categorias/GetCategoria/${categoriaId}`);
  }
  eliminarCategoria( categoriaId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Categorias/DeleteCategoria/${categoriaId}`);
  }
  actualizarCategoria(categoria: Icategoria): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Categorias/UpdateCategoria/${categoria.categoriaId}`, categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}
