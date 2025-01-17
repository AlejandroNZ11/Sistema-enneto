import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataTipoCitado, ItipoCitado, tipoCitado } from '../models/tipoCitado';
@Injectable({
  providedIn: 'root'
})
export class TipoCitadoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerTiposCitados(clinicaId: string, page: number, rows: number): Observable<DataTipoCitado> {
    return this.http.get<DataTipoCitado>(`${this.apiUrl}/TiposCitado/GetAllTipoCitado?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  obtenerListaTipoCitado(): Observable<ItipoCitado[]> {
    return this.http.get<ItipoCitado[]>(`${this.apiUrl}/TiposCitado/GetTipoCitadoList`);
  }
  crearTipoCitado(tipoCitado: tipoCitado): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/TiposCitado/SaveTipoCitado`, tipoCitado).pipe(
      catchError(error => {
      console.error('Error en la solicitud:', error);
      Swal.fire('Error', 'Ocurrió un error al guardar el Tipo Citado', 'warning');
      return throwError(() => error);
      })
  );
  } 
  obtenerTipoCitadoById(tipoCitadoId: string): Observable<ItipoCitado> {
    return this.http.get<ItipoCitado>(`${this.apiUrl}/TiposCitado/GetTipoCitado/${tipoCitadoId}`);
  }
  eliminarTipoCitado(tipoCitadoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/TiposCitado/DeleteTipoCitado/${tipoCitadoId}`);
  }
  actualizarTipoCitado(tipoCitado: ItipoCitado): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/TiposCitado/UpdateTipoCitado/${tipoCitado.tipoCitadoId}`, tipoCitado).pipe(
      catchError(error => {
        console.error('Error en la solicitud:', error);
        Swal.fire('Error', 'Ocurrió un error al guardar el Tipo Citado', 'warning');
        return throwError(() => error);
      })
    );
  }  
}