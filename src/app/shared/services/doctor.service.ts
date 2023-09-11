import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorListData, DoctorRequest, respuesta } from '../models/models';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  apiUrl = 'https://enneto-dental-dev.azurewebsites.net/api';
  constructor(public http: HttpClient) { }
  obtenerDoctores(clinicaId: string, page: number, rows: number): Observable<DoctorListData> {
    return this.http.get<DoctorListData>(this.apiUrl + `/Medicos/GetAllMedico?clinicaid=${clinicaId}&page=${page}&rows=${rows}`);
  }
  crearDoctor(doctor: DoctorRequest): Observable<respuesta> {
    return this.http.post<any>(this.apiUrl + '/Medicos/SaveMedico', doctor).pipe(
      catchError(error => {
        Swal.fire('Error', error.error, 'warning');
        return throwError(() => error);
      })
    );
  }
}
