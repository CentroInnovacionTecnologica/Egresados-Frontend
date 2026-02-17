import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Egresados2Component } from './egresados2.component';

describe('Egresados2Component', () => {
  let component: Egresados2Component;
  let fixture: ComponentFixture<Egresados2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Egresados2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Egresados2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
