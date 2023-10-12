import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoGastosComponent } from './agregar-tipo-gastos.component';

describe('AgregarTipoGastosComponent', () => {
  let component: AgregarTipoGastosComponent;
  let fixture: ComponentFixture<AgregarTipoGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
