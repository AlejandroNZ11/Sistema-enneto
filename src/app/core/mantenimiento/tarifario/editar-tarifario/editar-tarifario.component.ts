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
  ){}

  medida_LISTA: Array<Imedida> = [];
  moneda_LISTA: Array<IMoneda> = [];
  unidad_LISTA: Array<Iunidad> = [];
  tipoconcepto_LISTA: Array<ItipoConcepto> = [];
  form!: FormGroup;
  isFormSubmitted = false;
  tarifarioId = "";

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipoConcepto: ['', [Validators.required]],
      descripcion: ['',[Validators.required]],
      moneda: ['', [Validators.required]],
      costo: ['', [Validators.required]],
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
}
