import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTarjetaComponent } from './tipo-tarjeta.component';

describe('TarjetaComponent', () => {
  let component: TipoTarjetaComponent;
  let fixture: ComponentFixture<TipoTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTarjetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
