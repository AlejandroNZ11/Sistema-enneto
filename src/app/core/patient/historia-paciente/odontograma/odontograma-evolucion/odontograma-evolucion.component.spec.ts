import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaEvolucionComponent } from './odontograma-evolucion.component';

describe('OdontogramaEvolucionComponent', () => {
  let component: OdontogramaEvolucionComponent;
  let fixture: ComponentFixture<OdontogramaEvolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramaEvolucionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontogramaEvolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
