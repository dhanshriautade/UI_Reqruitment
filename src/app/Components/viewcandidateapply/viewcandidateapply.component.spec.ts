import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcandidateapplyComponent } from './viewcandidateapply.component';

describe('ViewcandidateapplyComponent', () => {
  let component: ViewcandidateapplyComponent;
  let fixture: ComponentFixture<ViewcandidateapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcandidateapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcandidateapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
