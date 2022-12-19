import { Test, TestingModule } from '@nestjs/testing';
import { EventSubTypesService } from './event-sub-types.service';

describe('EventSubTypesService', () => {
  let service: EventSubTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSubTypesService],
    }).compile();

    service = module.get<EventSubTypesService>(EventSubTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
