import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPacienteAlergia } from '../models/paciente-alergia';

@Injectable({providedIn: 'root'})
export class PacienteAlergiaService {
  constructor(public http: HttpClient,) { }

  obtenerPacienteExploracion(pacienteId:string):Observable<DataPacienteAlergia>{
    return this.http.get<DataPacienteAlergia>('/assets/json/paciente-alergia.json');
  }

}
