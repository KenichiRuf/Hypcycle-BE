
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('idea_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('idea_tags').insert([
        {id: 1, idea_id: 1, tag_id: 1},
        {id: 2, idea_id: 2, tag_id: 2},
        {id: 3, idea_id: 2, tag_id: 3}
      ]);
    });
};
