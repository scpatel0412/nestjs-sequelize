import { Test, TestingModule } from '@nestjs/testing';
import { EventsRatingService } from './events-rating.service';

describe('EventsRatingService', () => {
  let service: EventsRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsRatingService],
    }).compile();

    service = module.get<EventsRatingService>(EventsRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
