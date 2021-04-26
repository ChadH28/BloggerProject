exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('blogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogs').insert([
        {
          id: 1,
          blog_title: 'Masvidal got ktfo',
          blog_content: 'lore m ipiesum',
          blog_topic: 'topic of discussion',
          user_id: 1
        },
        {
          id: 2,
          blog_title: 'Chelsea for the win',
          blog_content: 'lore m ipiesum',
          blog_topic: 'topic of discussion',
          user_id: 2
        }, 
        {
          id: 3,
          blog_title: 'Skydiving spots in South Africa',
          blog_content: 'lore m ipiesum',
          blog_topic: 'topic of discussion',
          user_id: 3
        },
        {
          id: 4,
          blog_title: 'Hiking? is it worth the bother',
          blog_content: 'lore m ipiesum',
          blog_topic: 'topic of discussion',
          user_id: 2
        },
        {
          id: 5,
          blog_title: 'Gaming to take over sports in the near future',
          blog_content: 'lore m ipiesum',
          blog_topic: 'topic of discussion',
          user_id: 3
        }
      ]);
    });
};