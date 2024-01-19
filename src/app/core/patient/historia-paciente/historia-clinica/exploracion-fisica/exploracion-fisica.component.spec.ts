import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploracionFisicaComponent } from './exploracion-fisica.component';

describe('ExploracionFisicaComponent', () => {
  let component: ExploracionFisicaComponent;
  let fixture: ComponentFixture<ExploracionFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploracionFisicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploracionFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
