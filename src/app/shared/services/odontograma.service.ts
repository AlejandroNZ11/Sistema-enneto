import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataOdontogramaPaciente } from '../models/odontrograma';

@Injectable({providedIn: 'root'})
export class OdontogramaService {

  constructor(public http: HttpClient) { }

  obtenerOdontogramaPacienteList():Observable<DataOdontogramaPaciente>{
    return this.http.get<DataOdontogramaPaciente>('/assets/json/pacienteOdontograma.json');
  }

}
