// use knex.schema.createTable to create all your fields within the db


exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments();
            table.string('username').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.timestamp('date_started').defaultTo(knex.fn.now())
            table.timestamp('date_ended').defaultTo(knex.fn.now())
        })
        //   -- username
        //   -- email
        //   -- password
        //   -- dateStarted
        //   -- Boolean for isBlogger isReader
        //   -- blogger_dob
        //   -- location
        //   -- liked_topics
        //   -- blogger_id
        .createTable('blogs', function (table) {
            table.increments();
            table.string('blog_title').notNullable();
            table.string('blog_content').notNullable();
            table.string('blog_topic').notNullable();
            table.timestamp('date_blogCreated').defaultTo(knex.fn.now());
            table.timestamp('date_blogEdited').defaultTo(knex.fn.now());
            table.boolean('user').notNullable().defaultTo(false) // reader | user
            table.integer('user_id').references('id').inTable('users');
        })
        // -- blog_id
        // -- blog_title
        // -- blog_content
        // -- blog_picture
        // -- blog_topic
        // -- dateCreated or timePosted

        // -- comments section
        // -- upvotes section
};



exports.down = function (knex) {
    return knex.schema
        .dropTable('blogs')
        .dropTable('users')
};