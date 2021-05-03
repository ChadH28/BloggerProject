// use knex.schema.createTable to create all your fields within the db
// run knex migrate:rollback and
//  migrate:latest to update your latest migrated changes

exports.up = function (knex) {
  return (
    knex.schema
      .createTable("accounts", function (table) {
        table.increments();
        table.string("username").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("role").notNullable().defaultTo("reader"); // Reader | blogger | user
        table.timestamp("date_started").defaultTo(knex.fn.now());
        table.timestamp("date_ended").defaultTo(knex.fn.now());
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
      .createTable("blog", function (table) {
        table.increments();
        table.string("blog_title").notNullable();
        table.string("blog_content").notNullable();
        table.string("blog_topic").notNullable();
        table.timestamp("date_blogCreated").defaultTo(knex.fn.now());
        table.timestamp("date_blogEdited").defaultTo(knex.fn.now());
        table.boolean("user").notNullable().defaultTo(false); // reader | user
        table.integer("accounts_id").references("id").inTable("accounts");
      })
  );
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
  return knex.schema.dropTable("blog").dropTable("accounts");
};
