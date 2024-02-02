import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPacienteExploracion, IPacienteExploracion, pacienteExploracion } from '../models/paciente-exploracion';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';

@Injectable({providedIn: 'root'})
export class PacienteExploracionService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerPacienteExploracion(pacienteId:string, clinicaId:string, page:number, rows:number):Observable<DataPacienteExploracion>{
    return this.http.get<DataPacienteExploracion>(this.apiUrl + `/PacientesExploraciones/GetAllPacienteExploracion?pacienteId=${pacienteId}&clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  agregarPacienteExploracion(pacienteExploracion: pacienteExploracion):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesExploraciones/SavePacienteExploracion`,pacienteExploracion);
  }

  actualizarPacienteExploracion(pacienteExploracion:IPacienteExploracion):Observable<successResponse>{
    return this.http.put<successResponse>(this.apiUrl + `/PacientesExploraciones/UpdatePacienteExploracion/${pacienteExploracion.pacienteExploracionId}`,pacienteExploracion);
  }


}
