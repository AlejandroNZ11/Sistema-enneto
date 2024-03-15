import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
import { cajaAC } from 'src/app/shared/models/cajaAC';
import { CajaACService } from 'src/app/shared/services/cajaAC.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent {
  public routes = routes;
  Caja: cajaAC = new cajaAC();
  form1!: FormGroup;
  public mostrarErrores = false;
  mostrarFormulario = true;
  form2!: FormGroup;



  constructor(
    private renderer: Renderer2,
    public fb: FormBuilder, 
    private cajaService: CajaACService,
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

  
  abrirCuenta() {
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


}
