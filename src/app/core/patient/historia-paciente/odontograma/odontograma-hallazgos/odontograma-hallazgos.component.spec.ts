import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaHallazgosComponent } from './odontograma-hallazgos.component';

describe('OdontogramaHallazgosComponent', () => {
  let component: OdontogramaHallazgosComponent;
  let fixture: ComponentFixture<OdontogramaHallazgosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramaHallazgosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontogramaHallazgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
