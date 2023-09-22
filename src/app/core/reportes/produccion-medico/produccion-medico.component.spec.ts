import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionMedicoComponent } from './produccion-medico.component';

describe('ProduccionMedicoComponent', () => {
  let component: ProduccionMedicoComponent;
  let fixture: ComponentFixture<ProduccionMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
