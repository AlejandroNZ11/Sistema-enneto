import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataHistoriaDiagnostico } from '../models/historiaDiagnostico';

@Injectable({providedIn: 'root'})
export class HistoriaDiagnosticoService {
  constructor(public http: HttpClient,) { }

  obtenerDiagnosticoPaciente():Observable<DataHistoriaDiagnostico>{
    return this.http.get<DataHistoriaDiagnostico>('/assets/json/historia-diagnostico.json');
  }

}
