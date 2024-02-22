import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHallazgo1Component } from './editar-hallazgo1.component';

describe('EditarHallazgo1Component', () => {
  let component: EditarHallazgo1Component;
  let fixture: ComponentFixture<EditarHallazgo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarHallazgo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHallazgo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
