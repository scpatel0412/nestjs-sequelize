'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user_roles', [
      {
        name: 'Admin',
        value_info: 'admin',
        description: 'Admin has to handle Everything',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Event planner',
        value_info: 'event_planner',
        description: 'Event Planner can create events and services',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Event Planner Client',
        value_info: 'event_planner_client',
        description: 'Client can give order to Event Planner',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Event Planner Team Member',
        value_info: 'event_planner_team_member',
        description:
          'Event Planner can assign service task to its Team Members',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'User',
        value_info: 'user',
        description: 'User can enroll in events',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Invitors',
        value_info: 'invited_member',
        description: 'Invitors are invited in private events',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_roles', {
      [Op.or]: [
        { value_info: 'admin' },
        { value_info: 'event_planner' },
        { value_info: 'event_planner_client' },
        { value_info: 'event_planner_team_member' },
        { value_info: 'user' },
        { value_info: 'invited_member' },
      ],
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
