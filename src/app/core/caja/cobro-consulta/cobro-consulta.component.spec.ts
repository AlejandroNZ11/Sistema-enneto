import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobroConsultaComponent } from './cobro-consulta.component';

describe('CobroConsultaComponent', () => {
  let component: CobroConsultaComponent;
  let fixture: ComponentFixture<CobroConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CobroConsultaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CobroConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
