import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRxjs6Component } from './test-rxjs6.component';

describe('TestRxjs6Component', () => {
  let component: TestRxjs6Component;
  let fixture: ComponentFixture<TestRxjs6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestRxjs6Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRxjs6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
