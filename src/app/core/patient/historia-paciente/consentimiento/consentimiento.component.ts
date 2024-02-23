import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-consentimiento',
  templateUrl: './consentimiento.component.html',
  styleUrls: ['./consentimiento.component.scss']
})
export class ConsentimientoComponent implements OnInit {

  constructor(private route: ActivatedRoute, public sharedService: SharedService,){}
  pacienteId="";
  consentimientoList:string[]=['aaaaa','bbbbb','ccccc'];

  ngOnInit(): void {


    this.route.params.subscribe(params => {
     this.pacienteId = params['pacienteId'];
   })
   console.log(this.pacienteId)
   this.sharedService.setPacienteId(this.pacienteId);

 }


}
