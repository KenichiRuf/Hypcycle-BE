
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('org_users').del()
      .then(function () {
        // Inserts seed entries
        return knex('org_users').insert([
          {id: 1, user_id: 1, org_id: 1}
        ]);
      });
  };
  