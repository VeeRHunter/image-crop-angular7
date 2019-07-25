import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProfileWebPortfolioComponent } from './profile-web-portfolio.component';
import { ProfilePortfolioComponent } from './profile-portfolio.component';

describe('ProfilePortfolioComponent', () => {
  let component: ProfilePortfolioComponent;
  let fixture: ComponentFixture<ProfilePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePortfolioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
