import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConsultaSalud, IConsultaSalud } from '../models/consulta-salud';
import { environment } from 'src/environments/environments';
import { successResponse } from '../models/successResponse';

@Injectable({providedIn: 'root'})
export class ConsultaSaludService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerConsultaPaciente(pacienteId:string, clinicaId: string, page:number,rows:number):Observable<DataConsultaSalud>{
    return this.http.get<DataConsultaSalud>(this.apiUrl + `/PacientesConsultas/GetAllPacienteConsulta?pacienteId=${pacienteId}&clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

  agregarConsultaPaciente(consultaSalud:IConsultaSalud):Observable<successResponse>{
    return this.http.post<successResponse>(this.apiUrl + `/PacientesConsultas/SavePacienteConsulta`,consultaSalud);
  }

  actualizarConsultaPaciente(consultaSalud:IConsultaSalud):Observable<successResponse>{
    console.log("servicio")
    console.log(consultaSalud.pacienteConsultaId);
    console.log(consultaSalud)
    return this.http.put<successResponse>(this.apiUrl + `/PacientesConsultas/UpdatePacienteConsulta/${consultaSalud.pacienteConsultaId}`,consultaSalud);
  }

}
