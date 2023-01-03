import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventsRatingInput } from './dto/create-events-rating.input';
import { UpdateEventsRatingInput } from './dto/update-events-rating.input';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/user/model/user.model';
import { EventsModel } from 'src/events/model/events.model';
import { EventsRatingModel } from './model/events-rating.model';
import { Sequelize } from 'sequelize-typescript';
import { AverageEventsRatingModel } from './model/average-events-rating.model';

@Injectable()
export class EventsRatingService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(EventsModel) private eventsModel: typeof EventsModel,
    @InjectModel(EventsRatingModel)
    private eventsRatingModel: typeof EventsRatingModel,
    private sequelize: Sequelize,
  ) {}

  public async createEventsRating(
    ratings: CreateEventsRatingInput,
  ): Promise<EventsRatingModel> {
    if (ratings.rating_number > 5) {
      throw new Error(`Ratings should be under 5`);
    } else {
      const userResults = await this.userModel.findOne({
        where: { id: ratings.user_id },
      });
      if (!userResults) {
        throw new NotFoundException(
          `user with id ${ratings.user_id} not found`,
        );
      } else {
        const eventResults = await this.eventsModel.findOne({
          where: { id: ratings.event_id },
        });
        if (!eventResults) {
          throw new NotFoundException(
            `event with id ${ratings.event_id} not found`,
          );
        } else {
          const ratingsEntry = new EventsRatingModel();
          ratingsEntry.user_id = ratings.user_id;
          ratingsEntry.event_id = ratings.event_id;
          ratingsEntry.rating_comment = ratings.rating_comment;
          ratingsEntry.rating_number = ratings.rating_number;
          ratingsEntry.status = ratings.status;
          const ratingResults = await this.eventsRatingModel.create(
            ratingsEntry.dataValues,
          );
          return ratingResults;
        }
      }
    }
  }

  public async updateEventsRating(
    id: string,
    ratings: UpdateEventsRatingInput,
  ): Promise<EventsRatingModel> {
    const eventResults = await this.eventsRatingModel.findOne({
      where: { id },
    });
    if (!eventResults) {
      throw new NotFoundException(`event with id ${id} not found`);
    } else {
      const ratingsEntry = new EventsRatingModel();
      ratingsEntry.rating_comment = ratings.rating_comment;
      ratingsEntry.rating_number = ratings.rating_number;
      ratingsEntry.status = ratings.status;
      await this.eventsRatingModel.update(ratingsEntry.dataValues, {
        where: { id },
      });
      return ratingsEntry;
    }
  }

  public async deleteEventsRating(id: string): Promise<EventsRatingModel> {
    const eventResults = await this.eventsRatingModel.findOne({
      where: { id },
    });

    if (!eventResults) {
      throw new NotFoundException(`event with id ${id} not found`);
    } else {
      await this.eventsRatingModel.destroy({
        where: { id },
      });
      return eventResults;
    }
  }

  public async getEventsRating(id: string): Promise<EventsRatingModel> {
    const eventResults = await this.eventsRatingModel
      .scope([{ method: ['rated_user'] }, { method: ['rated_events'] }])
      .findOne({
        where: { id },
      });
    return eventResults;
  }

  public async getEventsRatings(): Promise<Array<EventsRatingModel>> {
    const eventResults = await this.eventsRatingModel
      .scope([{ method: ['rated_user'] }, { method: ['rated_events'] }])
      .findAll();
    return eventResults;
  }

  public async getEventsRatingsByUser(
    user_id: string,
  ): Promise<Array<EventsRatingModel>> {
    const eventResults = await this.eventsRatingModel
      .scope([{ method: ['rated_user'] }, { method: ['rated_events'] }])
      .findAll({ where: { user_id } });
    return eventResults;
  }

  public async getEventsRatingsByEvent(
    event_id: string,
  ): Promise<Array<EventsRatingModel>> {
    const eventResults = await this.eventsRatingModel
      .scope([{ method: ['rated_user'] }, { method: ['rated_events'] }])
      .findAll({ where: { event_id } });
    return eventResults;
  }

  public async getAllStarRatingsOfSpecificEvent(
    event_id: string,
  ): Promise<AverageEventsRatingModel> {
    const totalStarRating = await this.eventsRatingModel.count({
      where: { event_id },
    });
    const fiveStarRating = await this.eventsRatingModel.count({
      where: { event_id, rating_number: 5 },
    });
    const fourStarRating = await this.eventsRatingModel.count({
      where: { event_id, rating_number: 4 },
    });
    const threeStarRating = await this.eventsRatingModel.count({
      where: { event_id, rating_number: 3 },
    });
    const twoStarRating = await this.eventsRatingModel.count({
      where: { event_id, rating_number: 2 },
    });
    const oneStarRating = await this.eventsRatingModel.count({
      where: { event_id, rating_number: 1 },
    });
    const fiveStarAvg = parseFloat(
      String((fiveStarRating / totalStarRating) * 100),
    ).toFixed(2);

    const fourStarAvg = parseFloat(
      String((fourStarRating / totalStarRating) * 100),
    ).toFixed(2);

    const threeStarAvg = parseFloat(
      String((threeStarRating / totalStarRating) * 100),
    ).toFixed(2);

    const twoStarAvg = parseFloat(
      String((twoStarRating / totalStarRating) * 100),
    ).toFixed(2);

    const oneStarAvg = parseFloat(
      String((oneStarRating / totalStarRating) * 100),
    ).toFixed(2);

    const Score =
      fiveStarRating * 5 +
      fourStarRating * 4 +
      threeStarRating * 3 +
      twoStarRating * 2 +
      oneStarRating * 1;

    const totalResponse =
      fiveStarRating +
      fourStarRating +
      threeStarRating +
      twoStarRating +
      oneStarRating;

    const ratingAvg = parseFloat(String(Score / totalResponse)).toFixed(2);

    const ratingList = new AverageEventsRatingModel();
    ratingList.avg_rating = ratingAvg;
    ratingList.five_star = fiveStarAvg;
    ratingList.four_star = fourStarAvg;
    ratingList.three_star = threeStarAvg;
    ratingList.two_star = twoStarAvg;
    ratingList.one_star = oneStarAvg;
    return ratingList;
  }
}
