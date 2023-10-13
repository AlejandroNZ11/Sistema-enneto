import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMonedaComponent } from './editar-moneda.component';

describe('EditarMonedaComponent', () => {
  let component: EditarMonedaComponent;
  let fixture: ComponentFixture<EditarMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarMonedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
