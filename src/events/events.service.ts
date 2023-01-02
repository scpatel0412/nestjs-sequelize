import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateEventInput } from './dto/create-event.input';
import { CreateUsersEventsInput } from './dto/create-users-events.input';
import { UpdateEventInput } from './dto/update-event.input';
import { EventsModel } from './model/events.model';
import { UsersEventsModel } from './model/users-events.model';
import { EventSubTypesModel } from 'src/event-sub-types/model/event-sub-types.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventsModel) private eventsModel: typeof EventsModel,
    private sequelize: Sequelize,
    @InjectModel(UsersEventsModel)
    private usersEventsModel: typeof UsersEventsModel,
    @InjectModel(EventSubTypesModel)
    private eventSubTypesModel: typeof EventSubTypesModel,
  ) {}

  public async createEvent(events: CreateEventInput): Promise<EventsModel> {
    const eventSubResults = await this.eventSubTypesModel.findOne({
      where: { value_info: events.event_sub_type_name },
    });
    if (!eventSubResults) {
      throw new NotFoundException(
        `${events.event_sub_type_name} event sub type not found`,
      );
    } else {
      const eventInput = new EventsModel();
      eventInput.title = events.title;
      eventInput.description = events.description;
      eventInput.image = events.image;
      eventInput.city = events.city;
      eventInput.status = events.status;
      eventInput.country = events.country;
      eventInput.state = events.state;
      eventInput.event_time = events.event_time;
      eventInput.event_date = events.event_date;
      eventInput.userId = events.userId;
      eventInput.contact = events.contact;
      eventInput.address = events.address;
      eventInput.eventSubTypesId = eventSubResults.dataValues.id;

      const eventsResults = await this.eventsModel.create(
        eventInput.dataValues,
      );
      return eventsResults;
    }
  }

  public async updateEvent(
    id: string,
    events: UpdateEventInput,
  ): Promise<EventsModel> {
    const eventInput = await this.eventsModel.findOne({ where: { id } });
    if (!eventInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      eventInput.title = events.title;
      eventInput.description = events.description;
      eventInput.image = events.image;
      eventInput.city = events.city;
      eventInput.status = events.status;
      eventInput.country = events.country;
      eventInput.state = events.state;
      eventInput.event_time = events.event_time;
      eventInput.event_date = events.event_date;
      eventInput.contact = events.contact;
      eventInput.address = events.address;

      await this.eventsModel.update(eventInput.dataValues, { where: { id } });
      return eventInput;
    }
  }

  public async deleteEvent(id: string): Promise<EventsModel> {
    const eventInput = await this.eventsModel.findOne({ where: { id } });
    if (!eventInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.eventsModel.destroy({ where: { id } });
      return eventInput;
    }
  }

  public async getEvents(): Promise<Array<EventsModel>> {
    const eventInput = await this.eventsModel
      .scope([
        { method: ['users'] },
        { method: ['user_events'] },
        { method: ['event_sub_types'] },
        { method: ['events_rating_event'] },
      ])
      .findAll();
    return eventInput;
  }

  public async getEvent(id: string): Promise<EventsModel> {
    const eventInput = await this.eventsModel
      .scope([
        { method: ['users'] },
        { method: ['user_events'] },
        { method: ['event_sub_types'] },
        { method: ['events_rating_event'] },
      ])
      .findOne({ where: { id } });
    return eventInput;
  }

  public async enrollEvents(
    events: CreateUsersEventsInput,
  ): Promise<UsersEventsModel> {
    const eventInput = new UsersEventsModel();
    eventInput.eventId = events.eventId;
    eventInput.userId = events.userId;
    eventInput.is_active = events.is_active;

    const eventsResults = await this.usersEventsModel.create(
      eventInput.dataValues,
    );
    return eventsResults;
  }

  public async getPlannerCreatedEvents(
    userId: string,
  ): Promise<Array<EventsModel>> {
    const eventInput = await this.eventsModel
      .scope([
        { method: ['users'] },
        { method: ['user_events'] },
        { method: ['event_sub_types'] },
        { method: ['events_rating_event'] },
      ])
      .findAll({ where: { userId } });
    return eventInput;
  }
}
