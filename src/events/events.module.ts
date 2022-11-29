import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventsModel } from './model/events.model';
import { UsersEventsModel } from './model/users-events.model';

@Module({
  imports: [SequelizeModule.forFeature([EventsModel, UsersEventsModel])],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
