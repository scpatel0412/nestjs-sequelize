import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventSubTypesService } from './event-sub-types.service';
import { CreateEventSubTypeInput } from './dto/create-event-sub-type.input';
import { UpdateEventSubTypeInput } from './dto/update-event-sub-type.input';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { EventSubTypesModel } from './model/event-sub-types.model';
import { EventSubTypesCount } from './model/event-sub-types-count.model';

@Resolver(() => EventSubTypesModel)
export class EventSubTypesResolver {
  constructor(private readonly eventSubTypesService: EventSubTypesService) {}

  @AllowUnauthorized()
  @Mutation(() => EventSubTypesModel)
  createEventSubTypes(
    @Args('createEventSubTypeInput')
    createEventSubTypeInput: CreateEventSubTypeInput,
  ) {
    return this.eventSubTypesService.createEventSubTypes(
      createEventSubTypeInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventSubTypesModel)
  updateEventSubTypes(
    @Args('id') id: string,
    @Args('updateEventSubTypeInput')
    updateEventSubTypeInput: UpdateEventSubTypeInput,
  ) {
    return this.eventSubTypesService.updateEventSubTypes(
      id,
      updateEventSubTypeInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventSubTypesModel)
  deleteEventSubTypes(@Args('id') id: string) {
    return this.eventSubTypesService.deleteEventSubTypes(id);
  }

  @AllowUnauthorized()
  @Query(() => EventSubTypesModel)
  getEventSubType(@Args('id') id: string) {
    return this.eventSubTypesService.getEventSubType(id);
  }

  @AllowUnauthorized()
  @Query(() => [EventSubTypesModel])
  getEventSubTypes() {
    return this.eventSubTypesService.getEventSubTypes();
  }

  @AllowUnauthorized()
  @Query(() => EventSubTypesCount)
  countEventSubTypes() {
    return this.eventSubTypesService.countEventSubTypes();
  }
}
