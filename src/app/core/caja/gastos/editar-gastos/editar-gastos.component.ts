import { Component, OnInit, Renderer2  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { GastosService } from 'src/app/shared/services/gastos.service';
import { Igastos } from 'src/app/shared/models/gastos';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import { Icuenta, cuentaResponse } from 'src/app/shared/models/cuenta';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import { BancosService } from 'src/app/shared/services/bancos.service';
import { Ibancos } from 'src/app/shared/models/bancos';
import { IConceptoGasto } from 'src/app/shared/models/tipogastos';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { SedeService } from 'src/app/shared/services/sede.service';
import { Isede } from 'src/app/shared/models/sede';

@Component({
  selector: 'app-editar-gastos',
  templateUrl: './editar-gastos.component.html',
  styleUrls: ['./editar-gastos.component.scss']
})
export class EditarGastosComponent implements OnInit  {
  gastoEditada$: Subject<boolean> = new Subject<boolean>();
  gastoSeleccionada: any;
  conceptoGasto_LISTA: Array<IConceptoGasto>=[];
  banco_LISTA: Array<Ibancos>=[];
  cuentaPagar_LISTA: Array<Icuenta>=[];
  form!: FormGroup;
  isFormSubmitted = false;
  gastosId = "";
  gasto!: Igastos;
  public mostrarErrores = false;
  conceptoGasto: Array<string>=[];
  banco: Array<string>=[];
  cuentaPagar: Array<string>=[];
  sede_LISTA: Array<Isede> = [];
  sede: Array<string> = [];


  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public gastosservice: GastosService,
    public conceptogastoservice: TipoGastosService,
    public bancoservice: BancosService,
    public cuentaservice: CuentaService,
    public user: UserLoggedService,
    public bsModalRef: BsModalRef,
    private renderer: Renderer2,
    public sedeService: SedeService
  ){
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      conceptoGasto: ['', Validators.required],
      banco: ['', Validators.required],
      cuentaPagar: ['', Validators.required],
      monto: ['', Validators.required],
      operacion: ['', Validators.required],sedes: ['', Validators.required],
      responsable: ['', Validators.required],
      observacion: ['', Validators.required],
      estado: ['Activo',[Validators.required]],
    });

  }


  ngOnInit(): void { 

    this.gastosservice.obtenerGasto(this.gastoSeleccionada!).subscribe(gasto=>{
      this.gasto=gasto;
      this.form.patchValue({
        fecha: this.gasto.fecha,
        descripcion: this.gasto.descripcion,
        conceptoGasto: this.gasto.conceptoGastoId,
        banco: this.gasto.bancoId,
        cuentaPagar: this.gasto.cuentaPagarId,
        monto: this.gasto.monto,
        operacion: this.gasto.operacion,
        sedes: this.gasto.sedeId,
        responsable: this.gasto.responsable,
        observacion: this.gasto.observacion,
        estado: this.gasto.estado == '1' ? 'Activo' : 'Inactivo',
      })
    });


    this.cuentaservice.obtenerCuentaList().subscribe((data: Icuenta[]) => {
      this.cuentaPagar_LISTA = data;
    });
    this.bancoservice.obtenerListaBanco().subscribe((data: Ibancos[]) => {
      this.banco_LISTA = data;
    });

    this.conceptogastoservice.obtenerConceptoGastoList().subscribe((data: IConceptoGasto[]) => {
      this.conceptoGasto_LISTA = data;
    });

    this.sedeService.obtenerSedesList().subscribe((data: Isede[]) => {
      this.sede_LISTA = data;
    });
  }

  validarInput(event: any) {
    const inputValue = event.target.value;

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

  Cancelar() {
    this.gastoEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarGasto() {
    if (!this.gasto || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    
    const gastoActualizada: Igastos = {
      gastoId: this.gasto.gastoId,
      fecha: this.form.value.fecha,
      observacion: this.form.value.observacion,
      descripcion: this.form.value.descripcion,
      conceptoGastoId: this.form.value.conceptoGasto,
      cuentaPagarId: this.form.value.cuentaPagar,
      bancoId: this.form.value.banco,   
      monto: this.form.value.monto,
      operacion: this.form.value.operacion,
      sedeId: this.form.value.sedes,
      responsable: this.form.value.responsable,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.gastosservice.actualizarGastos(gastoActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.gastoEditada$.next(true);
          this.bsModalRef.hide();
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
