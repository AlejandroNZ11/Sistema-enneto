import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConsentimientoComponent } from './editar-consentimiento.component';

describe('EditarConsentimientoComponent', () => {
  let component: EditarConsentimientoComponent;
  let fixture: ComponentFixture<EditarConsentimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarConsentimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarConsentimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
