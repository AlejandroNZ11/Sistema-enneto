import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { caja } from 'src/app/shared/models/caja';
import { routes } from 'src/app/shared/routes/routes';
import { CajaService } from 'src/app/shared/services/caja.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-agregar-caja',
  templateUrl: './agregar-caja.component.html',
  styleUrls: ['./agregar-caja.component.scss']
})
export class AgregarCajaComponent implements OnInit{
  cajaAgregada$: Subject<boolean> = new Subject<boolean>();
  Caja: caja = new caja();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;

  ngOnInit(): void {  }

  constructor(
    public bsModalRef: BsModalRef, 
    private cajaService: CajaService,
    public fb: FormBuilder,
    ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && control?.touched;
  }

  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }

  Cancelar() {
    this.cajaAgregada$.next(true);
    this.bsModalRef.hide();
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearCaja() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Caja.nombre = this.form.get("nombre")?.value;
    this.Caja.estado = 1
    console.log(this.Caja);
    this.cajaService.crearCaja(this.Caja).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.cajaAgregada$.next(true);
          this.bsModalRef.hide();
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}

