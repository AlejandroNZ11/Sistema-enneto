import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGaleriaImagenesComponent } from './agregar-galeria-imagenes.component';

describe('AgregarGaleriaImagenesComponent', () => {
  let component: AgregarGaleriaImagenesComponent;
  let fixture: ComponentFixture<AgregarGaleriaImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarGaleriaImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarGaleriaImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
