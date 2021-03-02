const { table } = require("../dbConfig");

exports.up = function(knex) {
    return knex.schema.createTable("objectives", tbl => {
        tbl.increments("id");
        tbl.string("name");
        tbl.string("description");
        tbl.integer("playbook_id").unsigned().references("id").inTable("playbooks")
    })
    .table("steps", tbl => {
        tbl.dropColumn("order");
        tbl.integer("next").unsigned().references("id").inTable("steps");
        tbl.integer("previous").unsigned().references("id").inTable("steps");
    })
    .table("plays", tbl => {
        tbl.integer("head_step").unsigned().references("id").inTable("steps");
        tbl.integer("objective_id").unsigned().references("id").inTable("objectives");
    })
};

exports.down = function(knex) {
    return knex.schema
    .table("plays", tbl => {
        tbl.dropColumn("head_step");
        tbl.dropColumn("objective_id");
    })
    .table("steps", tbl => {
        tbl.dropColumn("previous");
        tbl.dropColumn("next");
        tbl.integer("order").unsigned();
    })
    .dropTableIfExists("objectives")
};
