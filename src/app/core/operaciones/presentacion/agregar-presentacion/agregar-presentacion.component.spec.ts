import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPresentacionComponent } from './agregar-presentacion.component';

describe('AgregarPresentacionComponent', () => {
  let component: AgregarPresentacionComponent;
  let fixture: ComponentFixture<AgregarPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
