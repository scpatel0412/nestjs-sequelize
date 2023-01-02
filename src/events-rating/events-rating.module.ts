import { Module } from '@nestjs/common';
import { EventsRatingService } from './events-rating.service';
import { EventsRatingResolver } from './events-rating.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { EventsRatingModel } from './model/events-rating.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, EventsModel, EventsRatingModel]),
  ],
  providers: [EventsRatingResolver, EventsRatingService],
})
export class EventsRatingModule {}
