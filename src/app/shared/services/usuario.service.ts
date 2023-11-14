import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataUsuario, IUsuario, Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) {}

  obtenerUsuarios(clinicaId: string, page: number, rows: number): Observable<DataUsuario> {
    return this.http.get<DataUsuario>(`${this.apiUrl}/Usuarios/GetAllUsuarios?clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  crearUsuario(usuario: Usuario): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/Usuarios/SaveUsuario`, usuario).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerUsuario(usuarioId: string): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.apiUrl}/Usuarios/GetUsuario/${usuarioId}`);
  }

  eliminarUsuario(usuarioId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/Usuarios/DeleteUsuario/${usuarioId}`);
  }

  actualizarUsuario(usuario: IUsuario): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/Usuarios/UpdateUsuario/${usuario.usuarioId}`, usuario).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
