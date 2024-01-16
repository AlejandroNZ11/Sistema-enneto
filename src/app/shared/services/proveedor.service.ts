import { Injectable } from '@angular/core';
import { successResponse } from '../models/successResponse';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DataProveedor ,Iproveedor,proveedor} from '../models/proveedor';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerProveedores(clinicaId: string, page: number, rows: number): Observable<DataProveedor> {
    return this.http.get<DataProveedor>(`${this.apiUrl}/Proveedor/GetAllProveedor?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  ///api/Proveedor/GetAllProveedor
  obtenerProveedor( proveedorRuc: string): Observable<Iproveedor> {
    return this.http.get<Iproveedor>(this.apiUrl + `/Proveedor/GetProveedor/${proveedorRuc}`);
  }
  crearProveedor(proveedor: proveedor): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Proveedor/SaveProveedor', proveedor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  ///api/Proveedor/SaveProveedor
  eliminarProveedor( proveedorId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Proveedor/DeleteProveedor/${proveedorId}`);
  }
  ///api/Proveedor/DeleteProveedor/{proveedorId}
  actualizarProveedor(proveedor: Iproveedor): Observable<successResponse> {
    return this.http.put<successResponse>(this.apiUrl + `/Proveedor/UpdateProveedor/${proveedor.ruc}`, proveedor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
  ///api/Proveedor/UpdateProveedor/{proveedorId}
}
