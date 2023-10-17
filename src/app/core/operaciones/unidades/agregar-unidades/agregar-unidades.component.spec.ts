import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUnidadesComponent } from './agregar-unidades.component';

describe('AgregarUnidadesComponent', () => {
  let component: AgregarUnidadesComponent;
  let fixture: ComponentFixture<AgregarUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
