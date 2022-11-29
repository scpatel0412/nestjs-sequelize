import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { CreateUsersEventsInput } from './dto/create-users-events.input';
import { EventsModel } from './model/events.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { UsersEventsModel } from './model/users-events.model';

@Resolver(() => EventsModel)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @AllowUnauthorized()
  @Mutation(() => EventsModel)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.createEvent(createEventInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventsModel)
  updateEvent(
    @Args('id') id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.updateEvent(id, updateEventInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventsModel)
  deleteEvent(@Args('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }

  @AllowUnauthorized()
  @Mutation(() => UsersEventsModel)
  enrollEvents(
    @Args('createUsersEventInput')
    createUsersEventInput: CreateUsersEventsInput,
  ) {
    return this.eventsService.enrollEvents(createUsersEventInput);
  }

  @AllowUnauthorized()
  @Query(() => [EventsModel])
  getEvents() {
    return this.eventsService.getEvents();
  }

  @AllowUnauthorized()
  @Query(() => EventsModel)
  getEvent(@Args('id') id: string) {
    return this.eventsService.getEvent(id);
  }
}
