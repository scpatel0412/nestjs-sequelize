import { Test, TestingModule } from '@nestjs/testing';
import { EventsFeedbackService } from './events-feedback.service';

describe('EventsFeedbackService', () => {
  let service: EventsFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsFeedbackService],
    }).compile();

    service = module.get<EventsFeedbackService>(EventsFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
