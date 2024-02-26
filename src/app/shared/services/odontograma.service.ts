import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataOdontogramaPaciente, IodontogramaPaciente } from '../models/odontrograma';
import { environment } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class OdontogramaService {

  apiUrl = environment.apiURL;


  constructor(public http: HttpClient) { }

  obtenerOdontogramaPacienteList():Observable<DataOdontogramaPaciente>{
    return this.http.get<DataOdontogramaPaciente>('/assets/json/pacienteOdontograma.json');
  }

  obtenerOdontogramaPacienteListAPI(pacienteId:string):Observable<IodontogramaPaciente[]>{
    return this.http.get<IodontogramaPaciente[]>(`${this.apiUrl}/PacientesOdontogramas/GetAllPacienteOdontograma?pacienteId=${pacienteId}&clinicaId=D30C2D1E-E883-4B2D-818A-6813E15046E6&page=1&rows=12`);
  }

}
