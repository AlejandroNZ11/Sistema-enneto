import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDiagnosticoComponent } from './crear-diagnostico.component';

describe('CrearDiagnosticoComponent', () => {
  let component: CrearDiagnosticoComponent;
  let fixture: ComponentFixture<CrearDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDiagnosticoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
