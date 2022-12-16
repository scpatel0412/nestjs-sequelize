import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesResolver } from './event-types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventTypesModel } from './model/event-types.model';

@Module({
  imports: [SequelizeModule.forFeature([EventTypesModel])],
  providers: [EventTypesResolver, EventTypesService],
})
export class EventTypesModule {}
