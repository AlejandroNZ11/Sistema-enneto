import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataConsultaSalud } from '../models/consulta-salud';

@Injectable({providedIn: 'root'})
export class ConsultaSaludService {
  constructor(public http: HttpClient,) { }

  obtenerConsultaPaciente(pacienteId:string):Observable<DataConsultaSalud>{
    return this.http.get<DataConsultaSalud>('/assets/json/pacienteConsulta.json');
  }

}
