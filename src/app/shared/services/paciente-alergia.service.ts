import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPacienteAlergia, updatePacienteAlergia } from '../models/paciente-alergia';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';

@Injectable({providedIn: 'root'})
export class PacienteAlergiaService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }

  obtenerPacienteAlergiaList(pacienteId:string, clinicaId:string, page:number, rows:number):Observable<DataPacienteAlergia>{
    return this.http.get<DataPacienteAlergia>(this.apiUrl + `/PacientesAlergias/GetAllPacienteAlergia?pacienteId=${pacienteId}&clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  agregarPacienteAlergia(pacienteAlergia: any):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesAlergias/SavePacienteAlergia`,pacienteAlergia);
  }

  eliminarPacienteAlergia(pacienteAlergiaId:string):Observable<successResponse>{
    return this.http.delete<successResponse>(this.apiUrl + `/PacientesAlergias/DeletePacienteAlergia/${pacienteAlergiaId}`);
  }

  actualizarPacienteAlergia(pacienteAlergia:updatePacienteAlergia):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacientesAlergias/UpdatePacienteAlergia/${pacienteAlergia.pacienteAlergiaId}`,pacienteAlergia);
  }

}
