import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAdminUpdateComponent } from './company-admin-update.component';

describe('CompanyAdminUpdateComponent', () => {
  let component: CompanyAdminUpdateComponent;
  let fixture: ComponentFixture<CompanyAdminUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyAdminUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAdminUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
