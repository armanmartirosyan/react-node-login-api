/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable("users", (table) => {
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
export function down(knex) {
	return knex.schema.dropTable("users");
};
