import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoMaterialesComponent } from './agregar-tipo-materiales.component';

describe('AgregarTipoMaterialesComponent', () => {
  let component: AgregarTipoMaterialesComponent;
  let fixture: ComponentFixture<AgregarTipoMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
