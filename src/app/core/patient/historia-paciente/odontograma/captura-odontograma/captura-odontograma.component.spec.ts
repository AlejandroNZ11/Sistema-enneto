import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaOdontogramaComponent } from './captura-odontograma.component';

describe('CapturaOdontogramaComponent', () => {
  let component: CapturaOdontogramaComponent;
  let fixture: ComponentFixture<CapturaOdontogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturaOdontogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapturaOdontogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
