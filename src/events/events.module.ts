import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModel } from './model/events.model';
import { UsersEventsModel } from './model/users-events.model';
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      EventsModel,
      UsersEventsModel,
      EventSubTypesModel,
    ]),
  ],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
