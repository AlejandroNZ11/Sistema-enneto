import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoCitadoComponent } from './agregar-tipo-citado.component';

describe('AgregarTipoCitadoComponent', () => {
  let component: AgregarTipoCitadoComponent;
  let fixture: ComponentFixture<AgregarTipoCitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTipoCitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTipoCitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
