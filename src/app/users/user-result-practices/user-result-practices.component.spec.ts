import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResultPracticesComponent } from './user-result-practices.component';

describe('UserResultPracticesComponent', () => {
  let component: UserResultPracticesComponent;
  let fixture: ComponentFixture<UserResultPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserResultPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResultPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
