import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataTarifario, tarifario, Itarifario } from 'src/app/shared/models/tarifario';
import { ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { Icategoria } from 'src/app/shared/models/categoria';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Imedida } from 'src/app/shared/models/medida';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { Iunidad } from 'src/app/shared/models/unidades';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregar-tarifario',
  templateUrl: './agregar-tarifario.component.html',
  styleUrls: ['./agregar-tarifario.component.scss']
})
export class AgregarTarifarioComponent implements OnInit {
  tarifarioAgregada$: Subject<boolean> = new Subject<boolean>();
  fechaRegistro: Date = new Date();
  
  categoria_LISTA: Array<Icategoria> = [];
  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  unidad_LISTA: Array<Iunidad> = [];
  medida_LISTA: Array<Imedida> = [];
  Tarifario: tarifario = new tarifario();
  public routes = routes;
  form!: FormGroup;
  public mostrarErrores = false;
  isFormSubmitted = false;
  public tipoconcepto !: string[];
  public categoria !: string[];
  public unidad !: string [];
  public medida !: string [];
  public grupo !: string [];




  constructor(
    public bsModalRef: BsModalRef,
    public formBuilder: FormBuilder, 
    public TipoConceptoService: TipoConceptoService,
    private tarifarioService: TarifarioService,
    public categoriaservice: CategoriaService,
    public medidaservice: MedidaService,
    public unidadservice: UnidadesService,
    private renderer: Renderer2,
    ) {
      
    }

  
  
  
  ngOnInit(): void {
    this.categoriaservice.obtenerListaCategoria().subscribe((data: Icategoria[]) => {
      this.categoria_LISTA = data;
    });
    this.TipoConceptoService.obtenerListaTipoConcepto().subscribe((data: ItipoConcepto[]) => {
      this.tipoconcepto_LISTA = data;
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
    grupo: ['',[Validators.required]],
    categoria: ['', [Validators.required]],
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
  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }
  
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  isRequerido(controlName: string) {
    const control = this.form.get(controlName);
    return control?.errors && control.errors['required'];
  }
  
  Cancelar() {
    this.tarifarioAgregada$.next(false);
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
    this.Tarifario.grupo= this.form.get("grupo")?.value;
    this.Tarifario.categoriaId = this.form.get("categoria")?.value;
    this.Tarifario.tipoConceptoId = this.form.get("tipoconcepto")?.value;
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
          this.tarifarioAgregada$.next(true);
        }else{
          console.error(response.message);
        }
      },
      (error)=>{
        console.error(error);
      });
  }
}




