import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestOpningComponent } from './latest-opning.component';

describe('LatestOpningComponent', () => {
  let component: LatestOpningComponent;
  let fixture: ComponentFixture<LatestOpningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestOpningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestOpningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
