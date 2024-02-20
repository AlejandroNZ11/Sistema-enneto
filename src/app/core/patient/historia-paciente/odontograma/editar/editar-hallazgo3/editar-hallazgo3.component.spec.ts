import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHallazgo3Component } from './editar-hallazgo3.component';

describe('EditarHallazgo3Component', () => {
  let component: EditarHallazgo3Component;
  let fixture: ComponentFixture<EditarHallazgo3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHallazgo3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHallazgo3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
