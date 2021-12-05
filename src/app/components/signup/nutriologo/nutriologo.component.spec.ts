import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriologoComponent } from './nutriologo.component';

describe('NutriologoComponent', () => {
  let component: NutriologoComponent;
  let fixture: ComponentFixture<NutriologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutriologoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutriologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
