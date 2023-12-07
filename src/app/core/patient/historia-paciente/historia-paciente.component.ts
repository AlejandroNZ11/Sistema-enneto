import { Component,OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-historia-paciente',
  templateUrl: './historia-paciente.component.html',
  styleUrls: ['./historia-paciente.component.scss']
})
export class HistoriaPacienteComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,private route: ActivatedRoute) { }
  public routes = routes;
  isFormSubmitted = false;
  form!: FormGroup;
  activeLink = '';
  pacienteId = "";
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pacienteId = params['pacienteId'];
    })
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  setActiveLink(link: string): void {
    this.activeLink = link; // Establece el enlace como activo
  }
}



