import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrtodonciaComponent } from './ortodoncia.component';

describe('OrtodonciaComponent', () => {
  let component: OrtodonciaComponent;
  let fixture: ComponentFixture<OrtodonciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrtodonciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrtodonciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
