import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataCategoria, Icategoria, categoria } from '../models/categoria-op';
@Injectable({
  providedIn: 'root'
})
export class CategoriaOpService {

    apiUrl = environment.apiURL;
    constructor(public http: HttpClient,) { }
  
    obtenerCategoria(clinicaId: string, page: number, rows: number): Observable<DataCategoria> {
      return this.http.get<DataCategoria>(this.apiUrl + `/Categoria/GetAllCategoria?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearCategoria(categorias: categoria): Observable<successResponse> {
      return this.http.post<successResponse>(this.apiUrl + '/Categoria/SaveCategoria', categorias).pipe(
        catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
        })
      );
    } 
    actualizarCategoria(categorias: Icategoria): Observable<successResponse> {
      return this.http.put<successResponse>(this.apiUrl + `/Categoria/${categorias.categoriaId}`, categorias).pipe(
        catchError(error => {
          Swal.fire('Error', error.error, 'warning');  
          return throwError(() => error);
        })
      );
    }
  }