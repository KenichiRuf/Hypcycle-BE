
exports.up = function(knex) {
    return knex.schema
    .createTable("users", tbl => {
      tbl.increments("id");
      tbl.string("first_name");
      tbl.string("last_name");
      tbl.string("email", 128).notNullable().unique();
      tbl.string("password", 128).notNullable();
    })
    .createTable("orgs", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.string("plan");
      tbl.integer("users");
    })
    .createTable("org_users", tbl => {
      tbl.increments("id");
      tbl.integer("user_id").unsigned().references("id").inTable("users");
      tbl.integer("org_id").unsigned().references("id").inTable("orgs");
    })
    .createTable("goals", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("org_id").unsigned().references("id").inTable("orgs");
      tbl.integer("owner_id").unsigned().references("id").inTable("org_users");
      tbl.string("metric");
      tbl.string("channel");
      tbl.date("start_date");
      tbl.date("deadline");
      tbl.float("start_value");
      tbl.float("current_value");
      tbl.float("goal_value");
    })
    .createTable("ideas", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("org_id").unsigned().references("id").inTable("orgs");
      tbl.integer("goal_id").unsigned().references("id").inTable("goals");
      tbl.integer("created_by").unsigned().references("id").inTable("org_users");
      tbl.string("description");
      tbl.integer("next").unsigned().references("id").inTable("ideas");
      tbl.integer("previous").unsigned().references("id").inTable("ideas");
      tbl.boolean("converted").defaultTo(false)
    })
    .createTable("experiments", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("idea_id").unsigned().references("id").inTable("ideas");
      tbl.integer("org_id").unsigned().references("id").inTable("orgs");
      tbl.string("status");
      tbl.string("description");
      tbl.date("start_date");
      tbl.integer("trials");
      tbl.integer("successes");
      tbl.float("target_success_rate")
    })
    .createTable("playbooks", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("org_id").unsigned().references("id").inTable("orgs");
      tbl.integer("owner_id").unsigned().references("id").inTable("org_users")
    })
    .createTable("plays", tbl => {
      tbl.increments("id");
      tbl.string("name");
      tbl.integer("playbook_id").unsigned().references("id").inTable("playbooks");
      tbl.integer("created_by").unsigned().references("id").inTable("org_users")
    })
    .createTable("steps", tbl => {
      tbl.increments("id");
      tbl.integer("play_id").unsigned().references("id").inTable("plays")
      tbl.integer("order").unsigned()
      tbl.string("description")
    })

};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("steps")
    .dropTableIfExists("plays")
    .dropTableIfExists("playbooks")
    .dropTableIfExists("experiments")
    .dropTableIfExists("ideas")
    .dropTableIfExists("goals")
    .dropTableIfExists("org_users")
    .dropTableIfExists("orgs")
    .dropTableIfExists("users");
};
