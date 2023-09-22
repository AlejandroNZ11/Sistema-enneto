import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaGeneralComponent } from './historia-general.component';

describe('HistoriaGeneralComponent', () => {
  let component: HistoriaGeneralComponent;
  let fixture: ComponentFixture<HistoriaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
