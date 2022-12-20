import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventTypeInput } from './dto/create-event-type.input';
import { UpdateEventTypeInput } from './dto/update-event-type.input';
import { InjectModel } from '@nestjs/sequelize';
import { EventTypesModel } from './model/event-types.model';
import { Sequelize } from 'sequelize-typescript';
import { string } from '@hapi/joi';
import { EventTypesCountModel } from './model/event-types-count.model';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectModel(EventTypesModel)
    private eventTypesModel: typeof EventTypesModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventTypes(
    events: CreateEventTypeInput,
  ): Promise<EventTypesModel> {
    const eventsInput = new EventTypesModel();
    eventsInput.name = events.name;
    eventsInput.description = events.description;
    eventsInput.value_info = events.value_info;
    eventsInput.status = events.status;

    const eventsResults = await this.eventTypesModel.create(
      eventsInput.dataValues,
    );

    return eventsResults;
  }

  public async updateEventTypes(
    id: string,
    events: UpdateEventTypeInput,
  ): Promise<EventTypesModel> {
    const eventsInput = await this.eventTypesModel.findOne({ where: { id } });
    if (!eventsInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      eventsInput.name = events.name;
      eventsInput.description = events.description;
      eventsInput.value_info = events.value_info;
      eventsInput.status = events.status;

      await this.eventTypesModel.update(eventsInput.dataValues, {
        where: { id },
      });

      return eventsInput;
    }
  }

  public async deleteEventTypes(id: string): Promise<EventTypesModel> {
    const eventsInput = await this.eventTypesModel.findOne({ where: { id } });
    if (!eventsInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventTypesModel.destroy({ where: { id } });
      return eventsInput;
    }
  }

  public async getEventTypes(): Promise<Array<EventTypesModel>> {
    const eventsInput = await this.eventTypesModel
      .scope([{ method: ['event_sub_types'] }])
      .findAll();
    return eventsInput;
  }

  public async getEventType(id: string): Promise<EventTypesModel> {
    const eventsInput = await this.eventTypesModel
      .scope([{ method: ['event_sub_types'] }])
      .findOne({ where: { id } });
    return eventsInput;
  }

  public async countEventTypes(): Promise<EventTypesCountModel> {
    const counts = await this.eventTypesModel.count();
    const eventCount = new EventTypesCountModel();
    eventCount.count = counts;
    return eventCount;
  }
}
