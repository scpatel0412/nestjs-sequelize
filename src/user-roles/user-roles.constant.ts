import { registerEnumType } from '@nestjs/graphql';

export enum UserRolesEnum {
  ADMIN = 'admin',
  EVENT_PLANNER = 'event_planner',
  EVENT_PLANNER_CLIENT = 'event_planner_client',
  EVENT_PLANNER_TEAM_MEMBER = 'event_planner_team_member',
  USER = 'user',
  INVITED_MEMBER = 'invited_member',
}

registerEnumType(UserRolesEnum, { name: 'UserRolesEnum' });
