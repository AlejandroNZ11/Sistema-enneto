import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarApoderadoComponent } from './editar-apoderado.component';

describe('EditarApoderadoComponent', () => {
  let component: EditarApoderadoComponent;
  let fixture: ComponentFixture<EditarApoderadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarApoderadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
