import { Injectable } from '@angular/core';
import { DataProducto, Iproducto, producto } from '../models/producto';
import { successResponse } from '../models/successResponse';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerProductos(clinicaId: string, page: number, rows: number): Observable<DataProducto> {
    return this.http.get<DataProducto>(this.apiUrl + `/Productos/GetAllProducto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
///api/Productos/GetAllProducto
  ///api/Productos/SaveProducto
  crearProducto(producto: producto): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Productos/SaveProducto', producto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
}
obtenerProducto( productoId: string): Observable<Iproducto> {
  return this.http.get<Iproducto>(this.apiUrl + `/Productos/GetProducto/${productoId}`);
}
///api/Productos/GetProducto/{productoId}
eliminarProducto( productoId: string): Observable<successResponse> {
  return this.http.delete<successResponse>(this.apiUrl + `/Productos/DeleteProducto/${productoId}`);
}
///api/Productos/DeleteProducto/{productoId}
//productoId
actualizarProducto(producto: Iproducto): Observable<successResponse> {
  return this.http.put<successResponse>(this.apiUrl + `/Productos/UpdateProducto/${producto.id}`, producto).pipe(
    catchError(error => {
      Swal.fire('Error', error.error, 'warning');
      return throwError(() => error);
    })
  );
}
///api/Productos/UpdateProducto/{productoId}
//, producto
}
