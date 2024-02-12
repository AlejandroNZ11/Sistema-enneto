import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentimientoComponent } from './consentimiento.component';

describe('ConsentimientoComponent', () => {
  let component: ConsentimientoComponent;
  let fixture: ComponentFixture<ConsentimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
