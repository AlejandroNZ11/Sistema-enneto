import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoConceptoComponent } from './editar-tipo-concepto.component';

describe('EditarTipoConceptoComponent', () => {
  let component: EditarTipoConceptoComponent;
  let fixture: ComponentFixture<EditarTipoConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoConceptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
