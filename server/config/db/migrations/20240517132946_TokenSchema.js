export function up(knex) {
	return knex.schema.createTable('tokens', function(table) {
		table.integer('userId').unsigned().notNullable();
		table.string('refreshToken').notNullable();
		table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
		table.timestamps(true, true);
});
};

export function down(knex) {
	return knex.schema.dropTable('tokens');
};