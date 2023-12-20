import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { DataConceptoGasto, IConceptoGasto, ConceptoGasto } from '../models/tipogastos';

@Injectable({
  providedIn: 'root'
})
export class TipoGastosService {

  apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  obtenerConceptoGastos(clinicaId: string, page: number, rows: number): Observable<DataConceptoGasto> {
    return this.http.get<DataConceptoGasto>(`${this.apiUrl}/ConceptosGastos/GetAllConceptoGasto?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }

  obtenerConceptoGastoList(): Observable<IConceptoGasto[]> {
    return this.http.get<IConceptoGasto[]>(`${this.apiUrl}/ConceptosGastos/GetConceptoGastoList`);
  }

  crearConceptoGasto(conceptoGasto: ConceptoGasto): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/ConceptosGastos/SaveConceptosGastos`, conceptoGasto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }

  obtenerConceptoGasto(conceptoGastoId: string): Observable<IConceptoGasto> {
    return this.http.get<IConceptoGasto>(`${this.apiUrl}/ConceptosGastos/GetConceptoGasto/${conceptoGastoId}`);
  }

  eliminarConceptoGasto(conceptoGastoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/ConceptosGastos/DeleteConceptoGasto/${conceptoGastoId}`);
  }

  actualizarConceptoGasto(conceptoGasto: IConceptoGasto): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/ConceptosGastos/${conceptoGasto.conceptoGastoId}`, conceptoGasto).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
