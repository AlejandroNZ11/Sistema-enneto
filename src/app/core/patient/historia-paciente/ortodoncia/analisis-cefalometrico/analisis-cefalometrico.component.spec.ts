import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisCefalometricoComponent } from './analisis-cefalometrico.component';

describe('AnalisisCefalometricoComponent', () => {
  let component: AnalisisCefalometricoComponent;
  let fixture: ComponentFixture<AnalisisCefalometricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisCefalometricoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisCefalometricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
