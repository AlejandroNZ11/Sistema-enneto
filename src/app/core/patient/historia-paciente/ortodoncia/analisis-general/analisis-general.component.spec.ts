import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisGeneralComponent } from './analisis-general.component';

describe('AnalisisGeneralComponent', () => {
  let component: AnalisisGeneralComponent;
  let fixture: ComponentFixture<AnalisisGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
