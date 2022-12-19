'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('event_types', [
      {
        name: 'Social Events',
        value_info: 'social_events',
        description: 'Social Events',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Corporate Events',
        value_info: 'corporate_events',
        description: 'Corporate Events',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Live Events',
        value_info: 'live_events',
        description: 'Live Events',
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Miscellaneous Events',
        value_info: 'miscellaneous_events',
        description: 'Miscellaneous Events',
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
    return queryInterface.bulkDelete('event_types', {
      [Op.or]: [
        { value_info: 'social_events' },
        { value_info: 'corporate_events' },
        { value_info: 'live_events' },
        { value_info: 'miscellaneous_events' },
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
