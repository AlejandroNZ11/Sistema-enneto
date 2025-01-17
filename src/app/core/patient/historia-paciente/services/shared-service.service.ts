import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHallazgo, THallazgo, siglasHallazgo } from 'src/app/shared/models/hallazgoOdontograma';

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

  private hallazgo: IHallazgo | null = null;
  private sigla: siglasHallazgo | undefined = undefined;


  setVariable(value: IHallazgo, sigla?:siglasHallazgo) {
    this.hallazgo = value;
    this.sigla = sigla
  }

  getVariable(): IHallazgo | null {
    return this.hallazgo;
  }

  getVariableSigla(): siglasHallazgo | undefined {
    return this.sigla;
  }

  resetVariable() {
    this.hallazgo = null;
    this.sigla = undefined;
  }

  hasSelection(): boolean {
    return this.hallazgo !== null;
  }
}





