import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataPacienteExploracion } from '../models/paciente-exploracion';

@Injectable({providedIn: 'root'})
export class PacienteExploracionService {
  constructor(public http: HttpClient,) { }

  obtenerPacienteExploracion(pacienteId:string):Observable<DataPacienteExploracion>{
    return this.http.get<DataPacienteExploracion>('/assets/json/paciente-exploracion.json');
  }
}
