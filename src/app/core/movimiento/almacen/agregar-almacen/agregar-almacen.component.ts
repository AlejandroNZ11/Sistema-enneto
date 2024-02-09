import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlmacenService } from 'src/app/shared/services/almacen.service';
import { almacen } from 'src/app/shared/models/almacen';
import Swal from 'sweetalert2';
import { routes } from 'src/app/shared/routes/routes';
import { Isede,} from 'src/app/shared/models/sede'; 
import { SedeService } from 'src/app/shared/services/sede.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-almacen',
  templateUrl: './agregar-almacen.component.html',
  styleUrls: ['./agregar-almacen.component.scss']
})
export class AgregarAlmacenComponent implements OnInit {
  almacenAgregada$: Subject<boolean> = new Subject<boolean>();
  Almacen: almacen = new almacen();
  public routes = routes;
  isFormSubmitted = false;
  form!: FormGroup;
  public mostrarErrores = false;
  sede_LISTA: Array<Isede> = [];
  public sedes !: string[];

  constructor(
    public formBuilder: FormBuilder, 
    public bsModalRef: BsModalRef, 
    private almacenService: AlmacenService, 
    public fb: FormBuilder, 
    public sedeService: SedeService ) {}
  
  ngOnInit(): void { 
    this.sedeService.obtenerSedesList().subscribe((data: Isede[]) => {
      this.sede_LISTA = data;
    });
    this.isFormSubmitted = false;
    this.form = this.formBuilder.group({
      sedes: ['', Validators.required],
      nombreAlmacen: ['', Validators.required],
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
    this.bsModalRef.hide()
    this.almacenAgregada$.next(false);
  }

  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  crearAlmacen() {
    if (this.form.invalid) {
      this.isTouched()
      return;
    }
    this.Almacen.sedeId =this.sedes;
    this.Almacen.sedeId = this.form.get("sedes")?.value;
    this.Almacen.nombreAlmacen = this.form.get("nombreAlmacen")?.value;
    console.log(this.Almacen);
    const formData = new FormData();
    this.almacenService.crearAlmacen(this.Almacen).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.almacenAgregada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}