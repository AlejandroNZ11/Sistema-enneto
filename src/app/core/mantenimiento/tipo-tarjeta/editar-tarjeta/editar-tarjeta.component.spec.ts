import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarjetaComponent } from './editar-tarjeta.component';

describe('EditarTarjetaComponent', () => {
  let component: EditarTarjetaComponent;
  let fixture: ComponentFixture<EditarTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTarjetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
