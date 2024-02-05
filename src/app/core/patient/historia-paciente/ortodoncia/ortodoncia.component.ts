import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-ortodoncia',
  templateUrl: './ortodoncia.component.html',
  styleUrls: ['./ortodoncia.component.scss']
})
export class OrtodonciaComponent implements OnInit{

  constructor(private route: ActivatedRoute, private sharedService: SharedService){}
  pacienteId = "";
  ngOnInit(): void {
    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })
  }



}
