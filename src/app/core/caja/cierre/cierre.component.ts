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
  }

  isInvalid(controlName: string) {
    const control = this.form1.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form1.get(controlName);
    return control?.errors && control.errors['required'];
  }

  alternarFormulario() {
    if (this.form1.invalid) {
      this.markAllFieldsAsTouched()      
      return;
    }
    this.mostrarFormulario = !this.mostrarFormulario;

  }

  

  validarInput(event: any) {
    const inputValue = event.target.value;
    const maxValueLength = 9;
    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
    }

  }

  
  abrirCaja() {
    if (this.form1.invalid) {
      this.isTouched()      
      return;
    }
    this.Caja.caja = this.form1.get("caja")?.value;
    this.Caja.turno= this.form1.get("turno")?.value;
    this.Caja.montoapertura= this.form1.get("montoapertura")?.value;
    console.log(this.Caja);
    this.cajaService.abrirCaja
  }

 
  cerrarCaja() {
    if (this.form2.invalid) {
      this.isTouched()      
      return;
    }
    this.Caja.montocierre = this.form2.get("montocierre")?.value;
    console.log(this.Caja);
    this.cajaService.abrirCaja
  }
}
