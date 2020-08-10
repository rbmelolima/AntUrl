import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('urls', table => {
    table.increments('id').primary();
    table.string('longUrl').notNullable();
    table.string('shortUrl').notNullable();    
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('urls');
}