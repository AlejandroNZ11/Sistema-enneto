import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTarifario, tarifario, Itarifario } from 'src/app/shared/models/tarifario';
import { ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { IMoneda } from 'src/app/shared/models/moneda';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { Imedida } from 'src/app/shared/models/medida';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { Iunidad } from 'src/app/shared/models/unidades';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
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
    public medidaservice: MedidaService,
    public unidadservice: UnidadesService,
    private renderer: Renderer2,
    ) {
      
    }

  
  fechaRegistro: Date = new Date();
  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  moneda_LISTA: Array<IMoneda> = [];
  unidad_LISTA: Array<Iunidad> = [];
  medida_LISTA: Array<Imedida> = [];
  Tarifario: tarifario = new tarifario();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  isFormSubmitted = false;
  public tipoconcepto !: string[];
  public moneda !: string[];
  public unidad !: string [];
  public medida !: string [];
  
  ngOnInit(): void {
    
    this.TipoConceptoService.obtenerListaTipoConcepto().subscribe((data: ItipoConcepto[]) => {
      this.tipoconcepto_LISTA = data;
    });

    this.monedaservice.obtenerListaMoneda().subscribe((data: IMoneda[]) => {
      this.moneda_LISTA = data;
    });

    this.medidaservice.obtenerListaMedida().subscribe((data: Imedida[]) => {
      this.medida_LISTA = data;
    });

    this.unidadservice.obtenerListaUnidades().subscribe((data: Iunidad []) => {
      this.unidad_LISTA = data;
    });

    this.isFormSubmitted = false;
    this.form = this.formBuilder.group({
    tipoconcepto: ['', [Validators.required]],
    descripcion: ['',[Validators.required]],
    moneda: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    medida: ['', [Validators.required]],
    unidad: ['', [Validators.required]],
    fechaRegistro: ['', [Validators.required]],
    
    })
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
    
    this.Tarifario.monedaId = this.form.get("moneda")?.value;
    this.Tarifario.tipoconceptoId = this.form.get("tipoconcepto")?.value;
    this.Tarifario.descripcion = this.form.get("descripcion")?.value;
    this.Tarifario.precio = this.form.get("precio")?.value;
    this.Tarifario.medidaId = this.form.get("medida")?.value;
    this.Tarifario.unidadId = this.form.get("unidad")?.value;
    this.Tarifario.fechaRegistro = this.form.get("fechaRegistro")?.value;
    this.Tarifario.estado = 1

    
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




