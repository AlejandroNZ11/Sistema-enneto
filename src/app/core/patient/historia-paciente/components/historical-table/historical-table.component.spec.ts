import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalTableComponent } from './historical-table.component';

describe('HistoricalTableComponent', () => {
  let component: HistoricalTableComponent;
  let fixture: ComponentFixture<HistoricalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
