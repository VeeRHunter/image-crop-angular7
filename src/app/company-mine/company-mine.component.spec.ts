import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMineComponent } from './company-mine.component';

describe('CompanyMineComponent', () => {
  let component: CompanyMineComponent;
  let fixture: ComponentFixture<CompanyMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyMineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
