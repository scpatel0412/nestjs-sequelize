import { Module } from '@nestjs/common';
import { EventSubTypesService } from './event-sub-types.service';
import { EventSubTypesResolver } from './event-sub-types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventSubTypesModel } from './model/event-sub-types.model';
import { EventTypesModel } from 'src/event-types/model/event-types.model';

@Module({
  imports: [SequelizeModule.forFeature([EventSubTypesModel, EventTypesModel])],
  providers: [EventSubTypesResolver, EventSubTypesService],
})
export class EventSubTypesModule {}
