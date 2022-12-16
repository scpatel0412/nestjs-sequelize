import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventTypesService } from './event-types.service';
import { CreateEventTypeInput } from './dto/create-event-type.input';
import { UpdateEventTypeInput } from './dto/update-event-type.input';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { EventTypesModel } from './model/event-types.model';
import { EventTypesCountModel } from './model/event-types-count.model';

@Resolver(() => EventTypesModel)
export class EventTypesResolver {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @AllowUnauthorized()
  @Mutation(() => EventTypesModel)
  createEventTypes(
    @Args('createEventTypeInput') createEventTypeInput: CreateEventTypeInput,
  ) {
    return this.eventTypesService.createEventTypes(createEventTypeInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventTypesModel)
  updateEventTypes(
    @Args('id') id: string,
    @Args('updateEventTypeInput') updateEventTypeInput: UpdateEventTypeInput,
  ) {
    return this.eventTypesService.updateEventTypes(id, updateEventTypeInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventTypesModel)
  deleteEventTypes(@Args('id') id: string) {
    return this.eventTypesService.deleteEventTypes(id);
  }

  @AllowUnauthorized()
  @Query(() => EventTypesModel)
  getEventType(@Args('id') id: string) {
    return this.eventTypesService.getEventType(id);
  }

  @AllowUnauthorized()
  @Query(() => [EventTypesModel])
  getEventTypes() {
    return this.eventTypesService.getEventTypes();
  }

  @AllowUnauthorized()
  @Query(() => EventTypesCountModel)
  countEventTypes() {
    return this.eventTypesService.countEventTypes();
  }
}
