import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPermisoComponent } from './agregar-permiso.component';

describe('AgregarPermisoComponent', () => {
  let component: AgregarPermisoComponent;
  let fixture: ComponentFixture<AgregarPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarPermisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
