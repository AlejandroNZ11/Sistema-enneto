import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConsentimientoComponent } from './agregar-consentimiento.component';

describe('AgregarConsentimientoComponent', () => {
  let component: AgregarConsentimientoComponent;
  let fixture: ComponentFixture<AgregarConsentimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarConsentimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarConsentimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
