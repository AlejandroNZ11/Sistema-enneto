import { Component, Renderer2, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { cajaAC } from 'src/app/shared/models/cajaAC';
import { CajaACService } from 'src/app/shared/services/cajaAC.service';
import { CajaService } from 'src/app/shared/services/caja.service';
import { Icaja } from 'src/app/shared/models/caja';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent implements OnInit{
  public routes = routes;
  Caja: cajaAC = new cajaAC();
  form1!: FormGroup;
  public mostrarErrores = false;
  mostrarFormulario = true;
  form2!: FormGroup;
  isFormSubmitted = false;
  caja_LISTA: Array<Icaja> = [];
  public caja !: string[];



  constructor(
    private renderer: Renderer2,
    public fb: FormBuilder, 
    private cajaService: CajaACService,
    public cajaservice: CajaService,
  ){
    this.form1 = this.fb.group({
      caja: ['', Validators.required],
      turno: ['', Validators.required],
      montoapertura: ['', Validators.required],
    });
    this.form2 = this.fb.group({
      montocierre: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.cajaservice.obtenerListaCaja().subscribe((data: Icaja[]) => {
      this.caja_LISTA = data;
    });
  }

  markAllFieldsAsTouched() {
    Object.values(this.form1.controls).forEach((control) => {
      control.markAsTouched();
    });
    
  }

  

  isTouched() {
    Object.values(this.form1.controls).forEach((control) => {
      control.markAsTouched();
    });
    Object.values(this.form2.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  

  isInvalid(controlName: string) {
    const control = this.form1.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form1.get(controlName);
    return control?.errors && control.errors['required'];
  }

  isInvalid2(controlName: string) {
    const control = this.form2.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido2(controlName: string) {
    const control = this.form2.get(controlName);
    return control?.errors && control.errors['required'];
  }

  // alternarFormulario() {
  //   if (this.form1.invalid) {
  //     this.markAllFieldsAsTouched()   
  //     return;
  //   }
  //   this.mostrarFormulario = !this.mostrarFormulario;
  // }

  alternarFormulario() {
    if (this.form1.invalid && this.form2.invalid) {
        this.markAllFieldsAsTouched();
        return;
    }

    if (this.mostrarFormulario) {
        this.mostrarFormulario = false;
    } else {
        // Si form1 es válido y form2 es inválido, muestra form2
        if (!this.form1.invalid && this.form2.invalid) {
            this.mostrarFormulario = true;
        }
        // Si form2 es válido y form1 es inválido, muestra form1
        else if (!this.form2.invalid && this.form1.invalid) {
            this.mostrarFormulario = false;
        } 
        // Si ambos formularios son válidos, muestra form1
        else {
            this.mostrarFormulario = false; // Puedes cambiar esto si prefieres mostrar form2 por defecto
        }
    }
}

  

  soloNumeros(event: KeyboardEvent): void {
    const teclasPermitidas = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter'];
    if (!teclasPermitidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  
  abrirCaja() {
    if (this.form1.invalid) {
      this.isTouched()      
      return;
    }
    this.mostrarFormulario = !this.mostrarFormulario;
    this.Caja.cajaId = this.form1.get("caja")?.value;
    this.Caja.turnoId= this.form1.get("turno")?.value;
    this.Caja.importeApertura= this.form1.get("montoapertura")?.value;
    console.log(this.Caja);
    this.cajaService.abrirCaja(this.Caja).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }

 
  cerrarCaja() {
    if (this.form2.invalid) {
      this.isTouched()      
      return;
    }
    this.mostrarFormulario = !this.mostrarFormulario;
    this.Caja.importeCierre = this.form2.get("montocierre")?.value;
    console.log(this.Caja);
    this.cajaService.abrirCaja(this.Caja).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}
