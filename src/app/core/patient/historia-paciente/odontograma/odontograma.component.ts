import { AfterViewInit, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../services/shared-service.service';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.scss']
})
export class OdontogramaComponent implements OnInit{

  constructor(private sharedService: SharedService){}
  pacienteId = "";

  ngOnInit(): void {
    this.sharedService.pacientID.subscribe((id)=>{
      this.pacienteId = id
    })

  }

}

