import { Test, TestingModule } from '@nestjs/testing';
import { EventSubTypesResolver } from './event-sub-types.resolver';
import { EventSubTypesService } from './event-sub-types.service';

describe('EventSubTypesResolver', () => {
  let resolver: EventSubTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSubTypesResolver, EventSubTypesService],
    }).compile();

    resolver = module.get<EventSubTypesResolver>(EventSubTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
