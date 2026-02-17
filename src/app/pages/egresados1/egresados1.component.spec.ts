import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Egresados1Component } from './egresados1.component';

describe('Egresados1Component', () => {
  let component: Egresados1Component;
  let fixture: ComponentFixture<Egresados1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Egresados1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Egresados1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
