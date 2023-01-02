import { Test, TestingModule } from '@nestjs/testing';
import { EventsRatingResolver } from './events-rating.resolver';
import { EventsRatingService } from './events-rating.service';

describe('EventsRatingResolver', () => {
  let resolver: EventsRatingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsRatingResolver, EventsRatingService],
    }).compile();

    resolver = module.get<EventsRatingResolver>(EventsRatingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
