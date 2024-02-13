import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaInicialComponent } from './odontograma-inicial.component';

describe('OdontogramaInicialComponent', () => {
  let component: OdontogramaInicialComponent;
  let fixture: ComponentFixture<OdontogramaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramaInicialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontogramaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
