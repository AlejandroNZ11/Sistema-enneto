import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroPresupuestoComponent } from './cobro-presupuesto.component';

describe('CobroPresupuestoComponent', () => {
  let component: CobroPresupuestoComponent;
  let fixture: ComponentFixture<CobroPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroPresupuestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobroPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
