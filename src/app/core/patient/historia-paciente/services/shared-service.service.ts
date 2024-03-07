import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { THallazgo } from 'src/app/shared/models/hallazgoOdontograma';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private pacienteIdSource = new BehaviorSubject<string>('');
  private pacienteNameSource = new BehaviorSubject<string>('');

  pacienteId$ = this.pacienteIdSource.asObservable();
  pacienteName$ = this.pacienteNameSource.asObservable();



  setPacienteId(pacienteId: string) {
    this.pacienteIdSource.next(pacienteId);
  }


  public get pacientID() : Observable<string> {
    return  this.pacienteId$
  }

  setPacienteName(name:string){
    this.pacienteNameSource.next(name);
  }

  public get pacienteName():Observable<string>{
    return this.pacienteName$;
  }

  private hallazgo: THallazgo | null = null;

  setVariable(value: THallazgo) {
    this.hallazgo = value;
  }

  getVariable(): THallazgo | null {
    return this.hallazgo;
  }

  resetVariable() {
    this.hallazgo = null;
  }

  hasSelection(): boolean {
    return this.hallazgo !== null;
  }
}





