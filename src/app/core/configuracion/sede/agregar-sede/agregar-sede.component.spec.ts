import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSedeComponent } from './agregar-sede.component';

describe('AgregarSedeComponent', () => {
  let component: AgregarSedeComponent;
  let fixture: ComponentFixture<AgregarSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarSedeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
