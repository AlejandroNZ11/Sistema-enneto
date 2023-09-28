import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoPagoComponent } from './agregar-tipo-pago.component';

describe('AgregarTipoPagoComponent', () => {
  let component: AgregarTipoPagoComponent;
  let fixture: ComponentFixture<AgregarTipoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
