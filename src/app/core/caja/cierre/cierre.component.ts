import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routes } from 'src/app/shared/routes/routes';
@Component({
  selector: 'app-cierre',
  templateUrl: './cierre.component.html',
  styleUrls: ['./cierre.component.scss']
})
export class CierreComponent {
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  mostrarFormulario = true;
  mostrarFormularioC = true;



  constructor(
    private renderer: Renderer2, 
  ){}

  alternarFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    this.mostrarFormularioC = !this.mostrarFormularioC;
  }

  validarInput(event: any) {
    const inputValue = event.target.value;
    const maxValueLength = 9;
    if (isNaN(inputValue)) {
      const newValue = inputValue.slice(0, -1);
      this.renderer.setProperty(event.target, 'value', newValue);
    }

  }


  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
}
