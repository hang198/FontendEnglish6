import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeStatisticComponent } from './practice-statistic.component';

describe('PracticeStatisticComponent', () => {
  let component: PracticeStatisticComponent;
  let fixture: ComponentFixture<PracticeStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
