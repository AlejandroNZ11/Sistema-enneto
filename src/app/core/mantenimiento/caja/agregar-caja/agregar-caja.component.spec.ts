import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCajaComponent } from './agregar-caja.component';

describe('AgregarCajaComponent', () => {
  let component: AgregarCajaComponent;
  let fixture: ComponentFixture<AgregarCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
