import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { DataDiagnostico,diagnostico,Idiagnostico } from '../models/diagnostico';
import { successResponse } from '../models/successResponse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerDiagnosticos(clinicaId: string, page: number, rows: number): Observable<DataDiagnostico> {
    return this.http.get<DataDiagnostico>(this.apiUrl + `/Enfermedad/GetAllEnfermedad?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
    
  }
  crearDiagnostico(diagnostico: diagnostico): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Enfermedad/SaveEnfermdedad', diagnostico).pipe(
        catchError(error => {
            Swal.fire('Error', error.error, 'warning');
            return throwError(() => error);
        })
    );
  }
  
  
  eliminarDiagnostico(EnfermedadId: string): Observable<successResponse> {
    return this.http.delete<successResponse>(this.apiUrl + `/Enfermedad/DeleteEnfermedad/${EnfermedadId}`);
  }
  
}