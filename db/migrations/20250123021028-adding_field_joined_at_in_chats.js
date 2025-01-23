"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("chats");

    if (!table.joined_at) {
      await queryInterface.addColumn("chats", "joined_at", {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable("chats");

    if (table.joined_at) {
      await queryInterface.removeColumn("chats", "joined_at");
    }
  },
};
