import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/shared-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AgregarGaleriaImagenesComponent } from './agregar-galeria-imagenes/agregar-galeria-imagenes.component';

@Component({
  selector: 'app-galeria-imagenes',
  templateUrl: './galeria-imagenes.component.html',
  styleUrls: ['./galeria-imagenes.component.scss']
})
export class GaleriaImagenesComponent {


  constructor(public bsModalRef: BsModalRef, private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private modalService: BsModalService){}

  pacienteId = "";


  public galleryImgs = [
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    },
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    },
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    },
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    },
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    },
    {
      img: "assets/img/galeria-imgs/blog-1.jpg",
    }
  ]

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
      console.log("desde galeria:", this.pacienteId)
    })

    this.sharedService.setPacienteId(this.pacienteId);

  }

  navegarAImagenes() {
    const pacienteId = this.pacienteId; // Obtén el pacienteId de donde lo tengas guardado en tu componente
    this.router.navigate(['/paciente/historia-paciente/imagenes', pacienteId]);
  }

  agregarImagen(){
    this.bsModalRef = this.modalService.show(AgregarGaleriaImagenesComponent,{class:'modal-lg'});

  }


}
