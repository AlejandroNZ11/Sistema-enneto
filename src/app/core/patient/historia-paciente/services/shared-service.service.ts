import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private pacienteIdSource = new BehaviorSubject<string>('');
  pacienteId$ = this.pacienteIdSource.asObservable();

  setPacienteId(pacienteId: string) {
    this.pacienteIdSource.next(pacienteId);
  }


  public get pacientID() : Observable<string> {
    return  this.pacienteId$
  }


}
