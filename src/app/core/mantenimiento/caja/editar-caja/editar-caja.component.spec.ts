import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCajaComponent } from './editar-caja.component';

describe('EditarCajaComponent', () => {
  let component: EditarCajaComponent;
  let fixture: ComponentFixture<EditarCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
