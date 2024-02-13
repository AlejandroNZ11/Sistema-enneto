import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastosComponent } from './editar-gastos.component';

describe('EditarGastosComponent', () => {
  let component: EditarGastosComponent;
  let fixture: ComponentFixture<EditarGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
