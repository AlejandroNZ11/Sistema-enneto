import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregrarClinicaComponent } from './agregrar-clinica.component';

describe('AgregrarClinicaComponent', () => {
  let component: AgregrarClinicaComponent;
  let fixture: ComponentFixture<AgregrarClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregrarClinicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregrarClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
