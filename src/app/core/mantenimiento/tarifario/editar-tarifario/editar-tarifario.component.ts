import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataMedida, Imedida } from 'src/app/shared/models/medida';
import { DataMoneda, IMoneda } from 'src/app/shared/models/moneda';
import { DataUnidad, Iunidad } from 'src/app/shared/models/unidades';
import { DataTipoConcepto, ItipoConcepto } from 'src/app/shared/models/tipoConcepto';
import { routes } from 'src/app/shared/routes/routes';
import { TarifarioService } from 'src/app/shared/services/tarifario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MedidaService } from 'src/app/shared/services/medida.service';
import { MonedaService } from 'src/app/shared/services/moneda.service';
import { UnidadesService } from 'src/app/shared/services/unidades.service';
import { TipoConceptoService } from 'src/app/shared/services/tipo-concepto.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Itarifario } from 'src/app/shared/models/tarifario';

interface data {
  value: string;
}


@Component({
  selector: 'app-editar-tarifario',
  templateUrl: './editar-tarifario.component.html',
  styleUrls: ['./editar-tarifario.component.scss']
})
export class EditarTarifarioComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public tarifarioservice: TarifarioService,
    public medidaservice: MedidaService,
    public monedaservice: MonedaService,
    public unidadservice: UnidadesService,
    public tipoconceptoservice: TipoConceptoService,
    public router: Router,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
  ){}

  medida_LISTA: Array<Imedida> = [];
  moneda_LISTA: Array<IMoneda> = [];
  unidad_LISTA: Array<Iunidad> = [];
  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  form!: FormGroup;
  isFormSubmitted = false;
  tarifarioId = "";
  public mostrarErrores = false;
  medida: Array<string> = [];
  moneda: Array<string> = [];
  unidad: Array<string> = [];
  tipoconcepto: Array<string> = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipoConcepto: ['', [Validators.required]],
      descripcion: ['',[Validators.required]],
      moneda: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      medida: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      fechaDeRegistro: ['', [Validators.required]],
    });

    this.isFormSubmitted = false;
    this.medidaservice.obtenerMedidas
    this.route.params.subscribe(params => {
      this.tarifarioId = params['medidaId'];
    })

    this.medidaservice.obtenerListaMedida().subscribe((data: Imedida[]) => {
      this.medida_LISTA = data;
    });

    this.monedaservice.obtenerMonedas
    this.route.params.subscribe(params => {
      this.tarifarioId = params['monedaId'];
    })

    this.monedaservice.obtenerListaMoneda().subscribe((data: IMoneda[]) => {
      this.moneda_LISTA = data;
    });

    this.tipoconceptoservice.obtenerTiposConceptos
    this.route.params.subscribe(params => {
      this.tarifarioId = params['tipoconceptoId'];
    })

    this.tipoconceptoservice.obtenerListaTipoConcepto().subscribe((data: ItipoConcepto[]) => {
      this.tipoconcepto_LISTA = data;
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
    this.bsModalRef.hide();
  }


  guardarTarifario() {
    if (!this.tarifarioId || this.form.invalid) {
      this.mostrarErrores = true;
      return;
    }
    
    const tarifarioActualizada: Itarifario = {
      tarifarioId: this.tarifarioId,
      medidaId: this.form.value.medida,
      monedaId: this.form.value.moneda,
      unidadId: this.form.value.unidad,
      tipoconceptoId: this.form.value.tipoConcepto,
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
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
