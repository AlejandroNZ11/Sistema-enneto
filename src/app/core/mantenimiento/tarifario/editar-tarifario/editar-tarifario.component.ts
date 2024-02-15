import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Imedida } from 'src/app/shared/models/medida';
import { Icategoria } from 'src/app/shared/models/categoria';
import { Iunidad } from 'src/app/shared/models/unidades';
import { ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Itarifario } from 'src/app/shared/models/tarifario';
import { param } from 'lightgallery/plugins/video/lg-video-utils';
import { Subject } from 'rxjs';

interface data {
  value: string;
}

@Component({
  selector: 'app-editar-tarifario',
  templateUrl: './editar-tarifario.component.html',
  styleUrls: ['./editar-tarifario.component.scss']
})
export class EditarTarifarioComponent implements OnInit {
  tarifarioEditada$: Subject<boolean> = new Subject<boolean>();
  tarifarioSeleccionada: any;
  medida_LISTA: Array<Imedida> = [];
  categoria_LISTA: Array<Icategoria> = [];
  unidad_LISTA: Array<Iunidad> = [];
  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  form!: FormGroup;
  isFormSubmitted = false;
  tarifarioId = "";
  public mostrarErrores = false;
  medida: Array<string> = [];
  categoria: Array<string> = [];
  unidad: Array<string> = [];
  tipoconcepto: Array<string> = [];
  tarifario!: Itarifario;
  grupo: Array<string> = [];


  constructor(
    public formBuilder: FormBuilder,
    public tarifarioservice: TarifarioService,
    public medidaservice: MedidaService,
    public categoriaservice: CategoriaService,
    public unidadservice: UnidadesService,
    public tipoconceptoservice: TipoConceptoService,
    public router: Router,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
  ){

    this.form = this.formBuilder.group({
      tipoconcepto: ['', [Validators.required]],
      descripcion: ['',[Validators.required]],
      grupo: ['',[Validators.required]],
      categoria: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      medida: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      estado: ['Activo',[Validators.required]],
    });
  }

  ngOnInit(): void {
    
    this.tarifarioservice.obtenerTarifario(this.tarifarioSeleccionada!).subscribe(tarifario=>{
      this.tarifario=tarifario;
      this.form.patchValue({
        descripcion: this.tarifario.descripcion,
        precio: this.tarifario.precio,
        fechaRegistro: this.tarifario.fechaRegistro,
        tipoconcepto: this.tarifario.tipoConceptoId,
        grupo: this.tarifario.grupo,
        medida: this.tarifario.medidaId,
        unidad: this.tarifario.unidadId,
        categoria: this.tarifario.categoriaId,
        estado: this.tarifario.estado == '1' ? 'Activo' : 'Inactivo',
      })
    });

    

    this.medidaservice.obtenerListaMedida().subscribe((data: Imedida[]) => {
      this.medida_LISTA = data;
    });

    this.categoriaservice.obtenerListaCategoria().subscribe((data: Icategoria[]) => {
      this.categoria_LISTA = data;
    });

    this.tipoconceptoservice.obtenerListaTipoConcepto().subscribe((data: ItipoConcepto[]) => {
      this.tipoconcepto_LISTA = data;
    });
    
    this.unidadservice.obtenerListaUnidades().subscribe((data: Iunidad[]) => {
      this.unidad_LISTA = data;
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
    this.tarifarioEditada$.next(false);
    this.bsModalRef.hide();
  }
  formatoFecha(fecha: string): string {
    const [anio, mes, dia] = fecha.toString().split('T')[0].split('-');
    return `${dia}-${mes}-${anio}`;
  }

  
  editarTarifario() {
    if (!this.tarifarioId || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    
    const tarifarioActualizada: Itarifario = {
      tarifarioId: this.tarifarioId,
      grupo: this.form.value.grupo,
      medidaId: this.form.value.medida,
      categoriaId: this.form.value.categoria,
      unidadId: this.form.value.unidad,
      tipoConceptoId: this.form.value.tipoconcepto,
      precio: this.form.value.precio,   
      fechaRegistro: this.form.value.fechaRegistro,
      descripcion: this.form.value.descripcion,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.tarifarioservice.actualizarTarifario(tarifarioActualizada).subscribe(
      (response) => {
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.tarifarioEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}


