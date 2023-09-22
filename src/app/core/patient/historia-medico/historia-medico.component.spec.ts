import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaMedicoComponent } from './historia-medico.component';

describe('HistoriaMedicoComponent', () => {
  let component: HistoriaMedicoComponent;
  let fixture: ComponentFixture<HistoriaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
