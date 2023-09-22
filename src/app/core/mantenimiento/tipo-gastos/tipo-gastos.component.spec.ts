import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGastosComponent } from './tipo-gastos.component';

describe('TipoGastosComponent', () => {
  let component: TipoGastosComponent;
  let fixture: ComponentFixture<TipoGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoGastosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
