
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('orgs').del()
      .then(function () {
        // Inserts seed entries
        return knex('orgs').insert([
          {id: 1, name: 'default', plan: 'free', users: 0}
        ]);
      });
  };
  