exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          id: 1,
          username: 'spazzchazz',
          email: 'chazz@gmail.com',
          password: '1234'
        },
        {
          id: 2,
          username: 'lazylarry',
          email: 'larry@gmail.com',
          password: '1234'
        },
        {
          id: 3,
          username: 'graceystacey',
          email: 'stacey@gmail.com',
          password: '1234'
        }
      ]);
    });
};