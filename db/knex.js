const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);


// terminal commands
    // knex migrate:make create_users_and_todos_tables
    // knex seed:make 01_users
    // knex seed:make 01_todos
    // knex migrate:rollback
    // knex migrate:latest
    // knex seed:run

    // npm i
        // express node pg knex body-parser, ensure your work is on a desktop hard-disk and not a flash
        // npm i knex -g, install knex globally as well

    // Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser  ##run this if getting a script running error