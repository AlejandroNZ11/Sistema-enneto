import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlergiasComponent } from './editar-alergias.component';

describe('EditarAlergiasComponent', () => {
  let component: EditarAlergiasComponent;
  let fixture: ComponentFixture<EditarAlergiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlergiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlergiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
