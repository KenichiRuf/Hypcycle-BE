
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('goals').del()
    .then(function () {
      // Inserts seed entries
      return knex('goals').insert([
        {id: 1, name: 'Increase Website Traffic', org_id: 1, owner_id: 1},
        {id: 2, name: 'Increase Website Conversion Rate', org_id: 1, owner_id: 1},
        {id: 3, name: 'Increase Instagram Followers', org_id: 1, owner_id: 1}
      ]);
    });
};
