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
  
    obtenerCategorias(clinicaId: string, page: number, rows: number): Observable<DataCategoria> {
      return this.http.get<DataCategoria>(this.apiUrl + `/CategoriaMateriales/GetAllCategoriaMaterial?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    }
    crearCategoria(categorias: categoria): Observable<successResponse> {
      return this.http.post<successResponse>(this.apiUrl + '/CategoriaMateriales/SaveCategoriaMaterial', categorias).pipe(
        catchError(error => {
          Swal.fire('Error', error.error, 'warning');
          return throwError(() => error);
        })
      );
    } 

    obtenerCategoria( categoriaId: string): Observable<Icategoria> {
      return this.http.get<Icategoria>(this.apiUrl + `/CategoriaMateriales/GetCategoriaMaterial/${categoriaId}`);
    }
    eliminarCategoria( categoriaId: string): Observable<successResponse> {
      return this.http.delete<successResponse>(this.apiUrl + `/CategoriaMateriales/DeleteCategoriaMaterial/${categoriaId}`);
    }
    actualizarCategoria(categorias: Icategoria): Observable<successResponse> {
      return this.http.put<successResponse>(this.apiUrl + `/CategoriaMateriales/UpdateCategoriaMaterial/${categorias.categoriaMaterialesId}`, categorias).pipe(
        catchError(error => {
          Swal.fire('Error', error.error, 'warning');  
          return throwError(() => error);
        })
      );
    }
  }