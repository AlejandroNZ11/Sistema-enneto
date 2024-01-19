import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSaludComponent } from './consulta-salud.component';

describe('ConsultaSaludComponent', () => {
  let component: ConsultaSaludComponent;
  let fixture: ComponentFixture<ConsultaSaludComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaSaludComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaSaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
