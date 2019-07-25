import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedlyComponent } from './embedly.component';

describe('EmbedlyComponent', () => {
  let component: EmbedlyComponent;
  let fixture: ComponentFixture<EmbedlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmbedlyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
