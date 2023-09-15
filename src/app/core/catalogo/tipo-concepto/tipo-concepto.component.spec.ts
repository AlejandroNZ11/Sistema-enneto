import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoConceptoComponent } from './tipo-concepto.component';

describe('TipoConceptoComponent', () => {
  let component: TipoConceptoComponent;
  let fixture: ComponentFixture<TipoConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoConceptoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
