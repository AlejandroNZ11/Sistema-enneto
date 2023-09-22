import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionMedicoComponent } from './comision-medico.component';

describe('ComisionMedicoComponent', () => {
  let component: ComisionMedicoComponent;
  let fixture: ComponentFixture<ComisionMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
