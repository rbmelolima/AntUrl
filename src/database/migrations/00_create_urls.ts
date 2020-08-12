import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('urls', table => {
    table.string('shortUrl').primary();
    table.string('longUrl').notNullable();
    table.integer('cliked').defaultTo(0).notNullable();
    table.string('created_at').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('urls');
}