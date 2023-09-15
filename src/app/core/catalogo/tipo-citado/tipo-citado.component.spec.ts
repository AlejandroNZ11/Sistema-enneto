import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCitadoComponent } from './tipo-citado.component';

describe('TipoCitadoComponent', () => {
  let component: TipoCitadoComponent;
  let fixture: ComponentFixture<TipoCitadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCitadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
