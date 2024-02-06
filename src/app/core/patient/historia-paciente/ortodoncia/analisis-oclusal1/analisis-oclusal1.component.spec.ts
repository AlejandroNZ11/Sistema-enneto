import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisOclusal1Component } from './analisis-oclusal1.component';

describe('AnalisisOclusal1Component', () => {
  let component: AnalisisOclusal1Component;
  let fixture: ComponentFixture<AnalisisOclusal1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisOclusal1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisOclusal1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
