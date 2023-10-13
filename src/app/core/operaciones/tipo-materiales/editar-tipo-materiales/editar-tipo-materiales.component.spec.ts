import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoMaterialesComponent } from './editar-tipo-materiales.component';

describe('EditarTipoMaterialesComponent', () => {
  let component: EditarTipoMaterialesComponent;
  let fixture: ComponentFixture<EditarTipoMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
