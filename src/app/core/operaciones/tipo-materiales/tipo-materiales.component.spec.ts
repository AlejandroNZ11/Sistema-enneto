import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMaterialesComponent } from './tipo-materiales.component';

describe('TipoMaterialesComponent', () => {
  let component: TipoMaterialesComponent;
  let fixture: ComponentFixture<TipoMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
