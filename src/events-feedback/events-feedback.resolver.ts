import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsFeedbackService } from './events-feedback.service';
import { CreateEventsFeedbackInput } from './dto/create-events-feedback.input';
import { UpdateEventsFeedbackInput } from './dto/update-events-feedback.input';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { EventsFeedbackModel } from './model/events-feedback.model';

@Resolver(() => EventsFeedbackModel)
export class EventsFeedbackResolver {
  constructor(private readonly eventsFeedbackService: EventsFeedbackService) {}

  @AllowUnauthorized()
  @Mutation(() => EventsFeedbackModel)
  createEventsFeedback(
    @Args('createEventsFeedbackInput')
    createEventsFeedbackInput: CreateEventsFeedbackInput,
  ) {
    return this.eventsFeedbackService.createEventsFeedback(
      createEventsFeedbackInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventsFeedbackModel)
  updateEventsFeedback(
    @Args('id') id: string,
    @Args('updateEventsFeedbackInput')
    updateEventsFeedbackInput: UpdateEventsFeedbackInput,
  ) {
    return this.eventsFeedbackService.updateEventsFeedback(
      id,
      updateEventsFeedbackInput,
    );
  }

  @AllowUnauthorized()
  @Mutation(() => EventsFeedbackModel)
  deleteEventsFeedback(@Args('id') id: string) {
    return this.eventsFeedbackService.deleteEventsFeedback(id);
  }

  @AllowUnauthorized()
  @Query(() => EventsFeedbackModel)
  getEventsFeedback(@Args('id') id: string) {
    return this.eventsFeedbackService.getEventsFeedback(id);
  }

  @AllowUnauthorized()
  @Query(() => [EventsFeedbackModel])
  getEventsFeedbacks() {
    return this.eventsFeedbackService.getEventsFeedbacks();
  }
}
