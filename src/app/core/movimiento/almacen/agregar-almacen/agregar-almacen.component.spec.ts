import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlmacenComponent } from './agregar-almacen.component';

describe('AgregarAlmacenComponent', () => {
  let component: AgregarAlmacenComponent;
  let fixture: ComponentFixture<AgregarAlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlmacenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
