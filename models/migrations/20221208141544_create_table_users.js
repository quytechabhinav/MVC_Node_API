
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.timestamps();

        //auto fields
        table.string('email', 255).notNull();
        table.string('firstname', 255).nullable();
        table.string('lastname', 255).nullable();
        table.string('phone', 255).nullable();
        table.integer('role', 2).nullable();
        table.string('password', 255).notNull();
        table.string('avatar', 255).nullable();
        table.integer('status', 2).nullable().defaultTo(1);
        table.string('reset_token', 36).nullable();
        table.datetime('pwdreset_requested_at').nullable();
        table.unique('email');
        table.index('email');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
