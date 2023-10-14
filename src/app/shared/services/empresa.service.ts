import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { UserLogedResponse} from '../models/user-logged/user-loged-response';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  apiUrl = environment.apiURL;
  constructor(public http: HttpClient) { }
  obtenerDatosEmpresa() {
		return this.http.get<UserLogedResponse>(environment.apiURL + '/Clinicas');
	}
}
