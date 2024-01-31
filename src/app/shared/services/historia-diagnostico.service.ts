import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataHistoriaDiagnostico } from '../models/historiaDiagnostico';
import { environment } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HistoriaDiagnosticoService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerDiagnosticoPaciente(pacienteId?: string, clinicaId?:string, page?:number, rows?:number):Observable<DataHistoriaDiagnostico>{
    return this.http.get<DataHistoriaDiagnostico>(this.apiUrl + `/PacientesDiagnosticos/GetAllPacienteDiagnostico?pacienteId=${pacienteId}&clinicaId=${clinicaId}&page=${page}&rows=${rows}`);
  }

}
