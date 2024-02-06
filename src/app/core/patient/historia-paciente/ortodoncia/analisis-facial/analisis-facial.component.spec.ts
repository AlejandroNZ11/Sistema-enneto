import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisFacialComponent } from './analisis-facial.component';

describe('AnalisisFacialComponent', () => {
  let component: AnalisisFacialComponent;
  let fixture: ComponentFixture<AnalisisFacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisFacialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
