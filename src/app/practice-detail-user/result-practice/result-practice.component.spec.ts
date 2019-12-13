import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPracticeComponent } from './result-practice.component';

describe('ResultPracticeComponent', () => {
  let component: ResultPracticeComponent;
  let fixture: ComponentFixture<ResultPracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultPracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
