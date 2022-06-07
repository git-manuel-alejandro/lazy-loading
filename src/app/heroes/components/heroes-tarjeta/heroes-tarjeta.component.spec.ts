import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesTarjetaComponent } from './heroes-tarjeta.component';

describe('HeroesTarjetaComponent', () => {
  let component: HeroesTarjetaComponent;
  let fixture: ComponentFixture<HeroesTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
