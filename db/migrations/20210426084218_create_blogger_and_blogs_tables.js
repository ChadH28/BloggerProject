// use knex.schema.createTable to create all your fields within the db
    // run knex migrate:rollback and
    //  migrate:latest to update your latest migrated changes

exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments();
            table.string('username').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('image', [99999]).notNullable();
            table.string('role').notNullable().defaultTo('reader') // Reader | blogger | admin
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
            // table.boolean('user').notNullable().defaultTo(false) // reader | user
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
        .createTable('comments', function (table) {
            table.increments();
            table.string('comment_content').notNullable();
            table.timestamp('date_commentCreated').defaultTo(knex.fn.now());
            table.timestamp('date_commentEdited').defaultTo(knex.fn.now());
            table.integer('user_id').references('id').inTable('users'); // user of comment
            table.integer('blog_id').references('id').inTable('blogs');
        })
        // -- comment_id
        // -- comment_content
        // -- dateCreated or timePosted

        // -- blogger comment relationship
        // -- comment to blog relationship
};


exports.down = function (knex) {
    return knex.schema
        .dropTable('blogs')
        .dropTable('users')
        .dropTable('comments')
};