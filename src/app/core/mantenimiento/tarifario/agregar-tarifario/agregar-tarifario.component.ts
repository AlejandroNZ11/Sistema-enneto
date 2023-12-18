import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTarifario, tarifario, Itarifario } from 'src/app/shared/models/tarifario';
import { ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { IMoneda } from 'src/app/shared/models/moneda';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-tarifario',
  templateUrl: './agregar-tarifario.component.html',
  styleUrls: ['./agregar-tarifario.component.scss']
})
export class AgregarTarifarioComponent {
  constructor(
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, 
    public TipoConceptoService: TipoConceptoService,
    private tarifarioService: TarifarioService,
    public monedaservice: MonedaService,
    
    ) { }

  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  moneda_LISTA: Array<IMoneda> = [];
  Tarifario: tarifario = new tarifario();
  public routes = routes;
  fechaDeRegistro: Date = new Date();
  form!: FormGroup;
  public mostrarErrores = false;
  isFormSubmitted = false;
  public tipoconcepto !: string[];
  public moneda !: string[];
  
  ngOnInit(): void {
    
    this.TipoConceptoService.obtenerListaTipoConcepto().subscribe((data: ItipoConcepto[]) => {
      this.tipoconcepto_LISTA = data;
    });

    this.monedaservice.obtenerListaMoneda().subscribe((data: IMoneda[]) => {
      this.moneda_LISTA = data;
    });
    this.isFormSubmitted = false;
    this.form = this.formBuilder.group({
    tipoConcepto: ['', [Validators.required]],
    descripcion: ['',[Validators.required]],
    moneda: ['', [Validators.required]],
    costo: ['', [Validators.required]],


    
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
  Cancelar() {
    this.bsModalRef.hide()
  }
  isTouched() {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  crearTarifario() {
    if (this.form.invalid) {
      this.isTouched()      
      return;
    }

    
    this.Tarifario.moneda = this.moneda;
    this.Tarifario.tipoconcepto = this.tipoconcepto;
    
    
    this.Tarifario.moneda = this.form.get("moneda")?.value;
    this.Tarifario.tipoconcepto = this.form.get("tipoconcepto")?.value;
    this.Tarifario.descripcion = this.form.get("descripcion")?.value;
    
    console.log(this.Tarifario);
    this.tarifarioService.crearTarifario(this.Tarifario).subscribe(
      (response)=>{
        if(response.isSuccess){
          Swal.fire(response.message, '', 'success');
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




