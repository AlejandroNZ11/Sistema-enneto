import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-hallazgo7',
  templateUrl: './agregar-hallazgo7.component.html',
  styleUrls: ['./agregar-hallazgo7.component.scss']
})
export class AgregarHallazgo7Component {


  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  hallazgo$?:string;
  numeroDiente$?:string;
  siglas$:string[]=[];

  estados:string[]=['Buen Estado', 'Mal Estado']

}
