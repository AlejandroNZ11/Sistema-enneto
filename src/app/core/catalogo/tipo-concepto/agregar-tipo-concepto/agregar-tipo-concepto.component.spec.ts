import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoConceptoComponent } from './agregar-tipo-concepto.component';

describe('AgregarTipoConceptoComponent', () => {
  let component: AgregarTipoConceptoComponent;
  let fixture: ComponentFixture<AgregarTipoConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoConceptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
