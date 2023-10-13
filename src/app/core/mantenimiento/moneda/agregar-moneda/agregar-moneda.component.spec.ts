import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarMonedaComponent } from './agregar-moneda.component';

describe('AgregarMonedaComponent', () => {
  let component: AgregarMonedaComponent;
  let fixture: ComponentFixture<AgregarMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarMonedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
