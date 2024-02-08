import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Itipoinventario } from 'src/app/shared/models/tipoInventario';
import { TipoInventarioService } from 'src/app/shared/services/tipoInventario.service';
import { routes } from 'src/app/shared/routes/routes';
import { InventarioService } from 'src/app/shared/services/inventario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IInventario } from 'src/app/shared/models/inventario';
import { Subject } from 'rxjs';

interface data {
  value: string;
}
@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.scss']
})
export class EditarInventarioComponent implements OnInit {
  inventarioEditada$: Subject<boolean> = new Subject<boolean>();
  inventarioSeleccionada: any;
  form!: FormGroup;
  isFormSubmitted = false;
  inventarioId = "";
  public mostrarErrores = false;
  tipoinventario_LISTA: Array<Itipoinventario> = [];
  tipoinventario: Array<string> = [];
  inventario!: IInventario;
  
  constructor(
    public formBuilder: FormBuilder,
    public inventarioservice: InventarioService,
    public router: Router,
    public bsModalRef: BsModalRef,
    public tipoinventarioservice: TipoInventarioService, 
    private renderer: Renderer2,
    
  ){
    this.form = this.formBuilder.group({
      codigoBarra: ['', [Validators.required]],
      nombreAlmacen: ['', [Validators.required]],
      tipoinventario: ['', [Validators.required]],
      nombreProducto: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      precioEntrada: ['', [Validators.required]],
      precioSalida: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      fechaRegistro: ['', [Validators.required]],
      estado: ['Activo',[Validators.required]],
    })
  }

  ngOnInit(): void {
    this.inventarioservice.obteneInventario(this.inventarioSeleccionada!).subscribe(inventario=>{
      this.inventario=inventario;
      this.form.patchValue({
        codigoBarra:this.inventario.CodigoBarra,
        nombreAlmacen:this.inventario.NombreAlmacen,
        tipoinventario:this.inventario.tipoInventarioId,
        nombreProducto:this.inventario.NombreProducto,
        unidad:this.inventario.unidad,
        precioEntrada:this.inventario.precioEntrada,
        precioSalida:this.inventario.precioSalida,
        stock:this.inventario.stock,
        fechaRegistro:this.inventario.fechaRegistro,
        estado: this.inventario.estado == '1' ? 'Activo' : 'Inactivo',
      })
    })

    this.tipoinventarioservice.obtenerTipoInventarioList().subscribe((data: Itipoinventario[]) => {
      this.tipoinventario_LISTA = data;
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
    this.inventarioEditada$.next(false);
    this.bsModalRef.hide();
  }

  guardarInventario(){
    if(!this.inventarioId || this. form.invalid) {
      this.mostrarErrores = true;
      return;
    }

    const inventarioActualizada: IInventario = {
      inventarioId: this.inventarioId,
      CodigoBarra: this.form.value.codigoBarra,
      NombreAlmacen: this.form.value. nombreAlmacen,
      NombreProducto: this.form.value.nombreProducto,
      tipoInventarioId: this.form.value.tipoinventario,
      precioEntrada: this.form.value.precioEntrada,
      precioSalida: this.form.value.precioSalida,
      unidad :this.form.value.unidad,
      stock :this.form.value.stock,
      fechaRegistro: this.form.value.fechaRegistro,
      estado: this.form.value.estado == 'Activo' ? '1' : '0',
    };

    this.inventarioservice.actualizarInventario(inventarioActualizada).subscribe(
      (response)=>{
        if (response.isSuccess) {
          Swal.fire(response.message, '', 'success');
          this.bsModalRef.hide();
          this.inventarioEditada$.next(true);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      });
  }
}
