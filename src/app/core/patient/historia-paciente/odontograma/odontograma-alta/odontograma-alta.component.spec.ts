import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdontogramaAltaComponent } from './odontograma-alta.component';

describe('OdontogramaAltaComponent', () => {
  let component: OdontogramaAltaComponent;
  let fixture: ComponentFixture<OdontogramaAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdontogramaAltaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdontogramaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
