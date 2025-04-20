import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSummaryComponent } from './topic-summary.component';

describe('TopicSummaryComponent', () => {
  let component: TopicSummaryComponent;
  let fixture: ComponentFixture<TopicSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
