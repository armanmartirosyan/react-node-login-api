import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
		table.increments("id").primary();
		table.string("email").notNullable().unique();
		table.string("password").notNullable();
		table.boolean("isActivated").defaultTo(false);
		table.string("activationLink");
		table.timestamps(true, true);
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("users");
};
