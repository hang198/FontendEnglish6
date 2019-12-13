import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDetailUserComponent } from './practice-detail-user.component';

describe('PracticeDetailUserComponent', () => {
  let component: PracticeDetailUserComponent;
  let fixture: ComponentFixture<PracticeDetailUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDetailUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
