import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventSubTypeInput } from './dto/create-event-sub-type.input';
import { UpdateEventSubTypeInput } from './dto/update-event-sub-type.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventSubTypesModel } from './model/event-sub-types.model';
import { Sequelize } from 'sequelize-typescript';
import { EventSubTypesCount } from './model/event-sub-types-count.model';

@Injectable()
export class EventSubTypesService {
  constructor(
    @InjectModel(EventSubTypesModel)
    private eventSubTypesModel: typeof EventSubTypesModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventSubTypes(
    events: CreateEventSubTypeInput,
  ): Promise<EventSubTypesModel> {
    const eventsModel = new EventSubTypesModel();
    eventsModel.name = events.name;
    eventsModel.value_info = events.value_info;
    eventsModel.description = events.description;
    eventsModel.title = events.title;
    eventsModel.image = events.image;
    eventsModel.meta_title = events.meta_title;
    eventsModel.meta_description = events.meta_description;
    eventsModel.status = events.status;

    const eventResults = await this.eventSubTypesModel.create(
      eventsModel.dataValues,
    );

    return eventResults;
  }

  public async updateEventSubTypes(
    id: string,
    events: UpdateEventSubTypeInput,
  ): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel.findOne({
      where: { id },
    });
    if (!eventsModel) {
      throw new NotFoundException(`${id} not found`);
    } else {
      eventsModel.name = events.name;
      eventsModel.value_info = events.value_info;
      eventsModel.description = events.description;
      eventsModel.title = events.title;
      eventsModel.image = events.image;
      eventsModel.meta_title = events.meta_title;
      eventsModel.meta_description = events.meta_description;
      eventsModel.status = events.status;

      await this.eventSubTypesModel.update(eventsModel.dataValues, {
        where: { id },
      });

      return eventsModel;
    }
  }

  public async deleteEventSubTypes(id: string): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel.findOne({
      where: { id },
    });
    if (!eventsModel) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventSubTypesModel.destroy({
        where: { id },
      });

      return eventsModel;
    }
  }

  public async getEventSubType(id: string): Promise<EventSubTypesModel> {
    const eventsModel = await this.eventSubTypesModel.findOne({
      where: { id },
    });
    return eventsModel;
  }

  public async getEventSubTypes(): Promise<Array<EventSubTypesModel>> {
    const eventsModel = await this.eventSubTypesModel.findAll();
    return eventsModel;
  }

  public async countEventSubTypes(): Promise<EventSubTypesCount> {
    const counts = await this.eventSubTypesModel.count();
    const eventCount = new EventSubTypesCount();
    eventCount.count = counts;
    return eventCount;
  }
}
