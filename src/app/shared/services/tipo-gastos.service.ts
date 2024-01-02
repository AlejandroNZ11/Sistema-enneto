import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http.get<DataConceptoGasto>(`${this.apiUrl}/ConceptosGastos/GetAllConceptoGasto?clinicaId=${clinicaId}&page=${page}&rows=${rows}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  crearConceptoGasto(conceptoGasto: ConceptoGasto): Observable<successResponse> {
    return this.http.post<successResponse>(`${this.apiUrl}/ConceptosGastos/SaveConceptosGastos`, conceptoGasto)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  obtenerConceptoGasto(conceptoGastoId: string): Observable<IConceptoGasto> {
    return this.http.get<IConceptoGasto>(`${this.apiUrl}/ConceptosGastos/GetConceptoGasto/${conceptoGastoId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  eliminarConceptoGasto(conceptoGastoId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(`${this.apiUrl}/ConceptosGastos/DeleteConceptoGasto/${conceptoGastoId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  actualizarConceptoGasto(conceptoGasto: IConceptoGasto): Observable<successResponse> {
    return this.http.put<successResponse>(`${this.apiUrl}/ConceptosGastos/UpdateConceptoGasto/${conceptoGasto.conceptoGastoId}`, conceptoGasto)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);

    let errorMessage = 'Ocurrió un error en la solicitud.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a Internet o CORS.';
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }

    Swal.fire('Error', errorMessage, 'error');

    return throwError(() => error);
  }
}
