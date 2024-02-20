import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHallazgo2Component } from './editar-hallazgo2.component';

describe('EditarHallazgo2Component', () => {
  let component: EditarHallazgo2Component;
  let fixture: ComponentFixture<EditarHallazgo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHallazgo2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHallazgo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
