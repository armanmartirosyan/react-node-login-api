import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('tokens', function(table) {
		table.integer('userId').unsigned().notNullable();
		table.string('refreshToken').notNullable();
		table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
		table.timestamps(true, true);
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex:Knex): Promise<void> {
	return knex.schema.dropTable('tokens');
};