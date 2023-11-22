'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Songs", "ArtistId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Artists",
        key: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Songs", "ArtistId", {});
  }
};
