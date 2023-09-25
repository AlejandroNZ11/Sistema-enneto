import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';
import { MedicoListData, MedicoRequest } from '../models/medico';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }
  obtenerMedicos(clinicaId: string, page: number, rows: number): Observable<MedicoListData> {
    return this.http.get<MedicoListData>(this.apiUrl + `/Medicos/GetAllMedico?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearMedico(doctor: FormData): Observable<successResponse> {
    return this.http.post<successResponse>(this.apiUrl + '/Medicos/SaveMedico', doctor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
