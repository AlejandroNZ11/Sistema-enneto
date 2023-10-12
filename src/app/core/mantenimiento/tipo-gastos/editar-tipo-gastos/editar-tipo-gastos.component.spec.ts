import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoGastosComponent } from './editar-tipo-gastos.component';

describe('EditarTipoGastosComponent', () => {
  let component: EditarTipoGastosComponent;
  let fixture: ComponentFixture<EditarTipoGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
