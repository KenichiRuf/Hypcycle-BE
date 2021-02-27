const { table } = require("../dbConfig");

exports.up = function(knex) {
    return knex.schema.table("steps", tbl => {
        tbl.dropColumn("order");
        tbl.integer("next").unsigned().references("id").inTable("steps");
    })
};

exports.down = function(knex) {
    return knex.schema.table("steps", tbl => {
        tbl.dropColumn("next");
        tbl.integer("order").unsigned()
    })
};
