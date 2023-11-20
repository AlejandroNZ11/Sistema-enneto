import { Injectable } from '@angular/core';
import { DataFormaEnteroClinica, IformaEnteroClinica } from '../models/formaEnteroClinica';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FormaEnteroClinicaService {

  apiUrl = environment.apiURL;
  constructor(public http: HttpClient,) { }

  obtenerFormaEnteroClinicas(): Observable<IformaEnteroClinica[]> {
    return this.http.get<IformaEnteroClinica[]>(this.apiUrl + `/InformacionClinicas/GetInformacionClinicaList`);
  }
}
