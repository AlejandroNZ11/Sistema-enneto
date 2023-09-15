import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlergiasComponent } from './agregar-alergias.component';

describe('AgregarAlergiasComponent', () => {
  let component: AgregarAlergiasComponent;
  let fixture: ComponentFixture<AgregarAlergiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarAlergiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAlergiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
