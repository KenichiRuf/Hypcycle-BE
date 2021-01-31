
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, first_name: 'Ken', last_name: 'Ruf', email: 'default@hypcycle.com', password: 'neverlogin'}
        ]);
      });
  };
  