import { Test, TestingModule } from '@nestjs/testing';
import { EventsFeedbackResolver } from './events-feedback.resolver';
import { EventsFeedbackService } from './events-feedback.service';

describe('EventsFeedbackResolver', () => {
  let resolver: EventsFeedbackResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsFeedbackResolver, EventsFeedbackService],
    }).compile();

    resolver = module.get<EventsFeedbackResolver>(EventsFeedbackResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
