import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasMaterialesComponent } from './marcas-materiales.component';

describe('MarcasMaterialesComponent', () => {
  let component: MarcasMaterialesComponent;
  let fixture: ComponentFixture<MarcasMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcasMaterialesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcasMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
