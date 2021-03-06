import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationComponent } from './profile-education.component';

describe('ProfileEducationComponent', () => {
  let component: ProfileEducationComponent;
  let fixture: ComponentFixture<ProfileEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEducationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
