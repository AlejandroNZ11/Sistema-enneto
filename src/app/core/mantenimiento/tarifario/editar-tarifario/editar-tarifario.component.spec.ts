import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTarifarioComponent } from './editar-tarifario.component';

describe('EditarTarifarioComponent', () => {
  let component: EditarTarifarioComponent;
  let fixture: ComponentFixture<EditarTarifarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTarifarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTarifarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
