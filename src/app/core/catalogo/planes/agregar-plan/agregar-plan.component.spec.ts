import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPlanComponent } from './agregar-plan.component';

describe('AgregarMedidaComponent', () => {
  let component: AgregarPlanComponent;
  let fixture: ComponentFixture<AgregarPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
