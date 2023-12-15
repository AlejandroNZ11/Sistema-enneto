import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTarifarioComponent } from './agregar-tarifario.component';

describe('AgregarTarifarioComponent', () => {
  let component: AgregarTarifarioComponent;
  let fixture: ComponentFixture<AgregarTarifarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTarifarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
