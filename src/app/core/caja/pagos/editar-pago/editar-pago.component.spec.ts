import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPagoComponent } from './editar-pago.component';

describe('EditarCategoriaComponent', () => {
  let component: EditarPagoComponent;
  let fixture: ComponentFixture<EditarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
