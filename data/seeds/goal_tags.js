
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('goal_tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('goal_tags').insert([
        {id: 1, goal_id: 1, tag_id: 1},
        {id: 2, goal_id: 1, tag_id: 2},
        {id: 3, goal_id: 2, tag_id: 2},
        {id: 4, goal_id: 2, tag_id: 3},
        {id: 5, goal_id: 3, tag_id: 3}
      ]);
    });
};
