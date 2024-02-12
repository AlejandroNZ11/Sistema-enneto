import { Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Gastos, DataGastos, Igastos } from 'src/app/shared/models/gastos';
import { routes } from 'src/app/shared/routes/routes';
import { GastosService } from 'src/app/shared/services/gastos.service';
import { IConceptoGasto } from 'src/app/shared/models/tipogastos';
import { TipoGastosService } from 'src/app/shared/services/tipo-gastos.service';
import { Icuenta } from 'src/app/shared/models/cuenta';
import { CuentaService } from 'src/app/shared/services/cuenta.service';
import { Ibancos } from 'src/app/shared/models/bancos';
import { BancosService } from 'src/app/shared/services/bancos.service';
import { UserLoggedService } from 'src/app/shared/services/user-logged.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-gastos',
  templateUrl: './agregar-gastos.component.html',
  styleUrls: ['./agregar-gastos.component.scss']
})
export class AgregarGastosComponent implements OnInit{
  gastoAgregada$: Subject<boolean> = new Subject<boolean>();
  Gasto: Gastos = new Gastos();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  isFormSubmitted = false;
  sede = '';
  conceptoGasto_LISTA: Array<IConceptoGasto>=[];
  banco_LISTA: Array<Ibancos>=[];
  cuentaPagar_LISTA: Array<Icuenta>=[];
  public conceptoGasto !: string[];
  public banco !: string [];
  public cuentaPagar !: string [];


  ngOnInit(): void { 
    this.sede = this.user.selectedSucursal.nombre;

    // this.cuentaservice.obtenerListaCuenta().subscribe((data: Icuenta[]) => {
    //   this.cuentaPagar_LISTA = data;
    // });
    this.bancoservice.obtenerListaBanco().subscribe((data: Ibancos[]) => {
      this.banco_LISTA = data;
    });

    this.conceptogastoservice.obtenerConceptoGastoList().subscribe((data: IConceptoGasto[]) => {
      this.conceptoGasto_LISTA = data;
    });
  }

  constructor(
    public bsModalRef: BsModalRef, 
    public fb: FormBuilder,
    private gastoservice: GastosService,
    private renderer: Renderer2,
    public user: UserLoggedService,
    public conceptogastoservice: TipoGastosService,
    public bancoservice: BancosService,
    public cuentaservice: CuentaService,
  ){
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      conceptoGasto: ['', Validators.required],
      banco: ['', Validators.required],
      cuentaPagar: ['', Validators.required],
      monto: ['', Validators.required],
      operacion: ['', Validators.required],
      sede: [{ value: this.user.selectedSucursal.nombre, disabled: true }, [Validators.required, Validators.maxLength(10)]],
      responsable: ['', Validators.required],
      observacion: ['', Validators.required],
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
    this.gastoAgregada$.next(false);
    this.bsModalRef.hide();
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearGasto() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }
    this.Gasto.fecha = this.form.get("fecha")?.value;
    this.Gasto.observacion = this.form.get("observacion")?.value;
    this.Gasto.descripcion = this.form.get("descripcion")?.value;
    this.Gasto.conceptoGastoId = this.form.get("conceptoGasto")?.value;
    this.Gasto.cuentaPagarId= this.form.get("cuentaPagar")?.value;
    this.Gasto.bancoId= this.form.get("banco")?.value;
    this.Gasto.monto= this.form.get("monto")?.value;
    this.Gasto.operacion= this.form.get("operacion")?.value;
    this.Gasto.sedeId = this.user.selectedSucursal.id.toString();
    this.Gasto.responsable= this.form.get("responsable")?.value;
    this.Gasto.observacion= this.form.get("observacion")?.value;
    console.log(this.Gasto);
    this.gastoservice.crearGastos(this.Gasto).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.gastoAgregada$.next(true);
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}
