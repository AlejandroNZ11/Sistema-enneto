import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarApoderadoComponent } from './agregar-apoderado.component';

describe('AgregarApoderadoComponent', () => {
  let component: AgregarApoderadoComponent;
  let fixture: ComponentFixture<AgregarApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarApoderadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
