import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoCitadoComponent } from './editar-tipo-citado.component';

describe('EditarTipoCitadoComponent', () => {
  let component: EditarTipoCitadoComponent;
  let fixture: ComponentFixture<EditarTipoCitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoCitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoCitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
