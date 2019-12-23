import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailStComponent } from './practice-detail-st.component';

describe('PracticeDetailStComponent', () => {
  let component: PracticeDetailStComponent;
  let fixture: ComponentFixture<PracticeDetailStComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailStComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
