const tableNames = require('../tableNames');

/**
  @param {Knex} knex
*/

function references(table, tablename) {
  table.integer(`${tablename}_id`).unsigned().references('id').inTable(tablename);
}

exports.up = async (knex) => {
  await knex.schema.createTable(tableNames.badges, (table) => {
    table.increments().notNullable();
    table.text('name').unique();
    table.timestamps(false, true);
    table.text('badge_url', 2000);
  });

  await knex.schema.createTable(tableNames.user, (table) => {
    table.increments().notNullable();
    table.text('display_name', 25).notNullable().unique();
    table.timestamps(false, true);
    table.integer('points').unsigned().notNullable();
  });
};

exports.down = async (knex) => {
  await Promise.all([tableNames.user].map((tablename) => knex.schema.dropTable(tablename)));
};
