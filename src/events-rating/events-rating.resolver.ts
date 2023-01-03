import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsRatingService } from './events-rating.service';
import { CreateEventsRatingInput } from './dto/create-events-rating.input';
import { UpdateEventsRatingInput } from './dto/update-events-rating.input';
import { EventsRatingModel } from './model/events-rating.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { GqlAuthId } from 'src/auth/decorators/gql-auth-id.decorator';
import { AverageEventsRatingModel } from './model/average-events-rating.model';

@Resolver(() => EventsRatingModel)
export class EventsRatingResolver {
  constructor(private readonly eventsRatingService: EventsRatingService) {}

  @AllowUnauthorized()
  @Mutation(() => EventsRatingModel)
  createEventsRating(
    @Args('createEventsRatingInput')
    createEventsRatingInput: CreateEventsRatingInput,
  ) {
    return this.eventsRatingService.createEventsRating(createEventsRatingInput);
  }

  @AllowUnauthorized()
  @Mutation(() => EventsRatingModel)
  updateEventsRating(
    @Args('id') id: string,
    @Args('updateEventsRatingInput')
    updateEventsRatingInput: UpdateEventsRatingInput,
  ) {
    return this.eventsRatingService.updateEventsRating(
      id,
      updateEventsRatingInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventsRatingModel)
  deleteEventsRating(@Args('id') id: string) {
    return this.eventsRatingService.deleteEventsRating(id);
  }

  @AllowUnauthorized()
  @Query(() => EventsRatingModel)
  getEventsRating(@Args('id') id: string) {
    return this.eventsRatingService.getEventsRating(id);
  }

  @AllowUnauthorized()
  @Query(() => [EventsRatingModel])
  getEventsRatings() {
    return this.eventsRatingService.getEventsRatings();
  }

  @Query(() => [EventsRatingModel])
  getEventsRatingsByUser(@GqlAuthId() user_id: string) {
    return this.eventsRatingService.getEventsRatingsByUser(user_id);
  }

  @AllowUnauthorized()
  @Query(() => [EventsRatingModel])
  getEventsRatingsByEvent(@Args('event_id') event_id: string) {
    return this.eventsRatingService.getEventsRatingsByEvent(event_id);
  }

  @AllowUnauthorized()
  @Query(() => AverageEventsRatingModel)
  getAllStarRatingsOfSpecificEvent(@Args('event_id') event_id: string) {
    return this.eventsRatingService.getAllStarRatingsOfSpecificEvent(event_id);
  }
}
