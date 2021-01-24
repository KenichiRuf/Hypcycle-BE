
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, name: 'SEO'},
        {id: 2, name: 'PPC'},
        {id: 3, name: 'CRO'}
      ]);
    });
};
