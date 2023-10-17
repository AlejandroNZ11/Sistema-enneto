import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUnidadesComponent } from './editar-unidades.component';

describe('EditarUnidadesComponent', () => {
  let component: EditarUnidadesComponent;
  let fixture: ComponentFixture<EditarUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
