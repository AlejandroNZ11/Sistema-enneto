import {  Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-odontograma-hallazgos',
  templateUrl: './odontograma-hallazgos.component.html',
  styleUrls: ['./odontograma-hallazgos.component.scss']
})
export class OdontogramaHallazgosComponent{


  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgo$?:string;
  numeroDiente$?:string;

}
