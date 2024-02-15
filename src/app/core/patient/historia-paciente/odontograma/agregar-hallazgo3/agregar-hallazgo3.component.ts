import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-hallazgo3',
  templateUrl: './agregar-hallazgo3.component.html',
  styleUrls: ['./agregar-hallazgo3.component.scss']
})
export class AgregarHallazgo3Component {
  hallazgoAgregado$: Subject<boolean> = new Subject<boolean>();
  numeroDiente$?:string;

  estados_list= [
    { name: 'Buen Estado', value: 'B', checked: false },
    { name: 'Mal Estado', value: 'M', checked: false },
  ]


}
