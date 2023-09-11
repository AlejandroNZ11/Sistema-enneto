import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCategoria, Icategoria, categoria, respuesta } from '../models/models';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl: string = "https://enneto-dental-dev.azurewebsites.net/api";
  constructor(public http: HttpClient,) { }

  obtenerCategorias(page: number, rows: number): Observable<DataCategoria> {
    return this.http.get<DataCategoria>(this.apiUrl + `/Categorias/GetAllCategoria?page=${page}&rows=${rows}`);
  }
  crearCategoria(categoria: categoria): Observable<respuesta> {
    return this.http.post<any>(this.apiUrl + '/Categorias/SaveCategoria', categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  actualizarCategoria(categoria: any): Observable<respuesta> {
    return this.http.put<any>(this.apiUrl + `/Categorias/${categoria.id}`, categoria).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }


}
