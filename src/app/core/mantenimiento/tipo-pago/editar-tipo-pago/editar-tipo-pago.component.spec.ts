import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoPagoComponent } from './editar-tipo-pago.component';

describe('EditarTipoPagoComponent', () => {
  let component: EditarTipoPagoComponent;
  let fixture: ComponentFixture<EditarTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
