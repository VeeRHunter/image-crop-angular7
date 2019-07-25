import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCareersComponent } from './company-careers.component';

describe('CompanyCareersComponent', () => {
  let component: CompanyCareersComponent;
  let fixture: ComponentFixture<CompanyCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
