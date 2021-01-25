
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ideas').del()
    .then(function () {
      // Inserts seed entries
      return knex('ideas').insert([
        {id: 1, name: 'Custom Shoe Giveaway', org_id: 1},
        {id: 2, name: 'Update Ad Creative', org_id: 1},
        {id: 3, name: 'Replace Low Performing Links In Navigation', org_id: 1}
      ]);
    });
};
