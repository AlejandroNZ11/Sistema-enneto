import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisOclusal2Component } from './analisis-oclusal2.component';

describe('AnalisisOclusal2Component', () => {
  let component: AnalisisOclusal2Component;
  let fixture: ComponentFixture<AnalisisOclusal2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisOclusal2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisOclusal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
