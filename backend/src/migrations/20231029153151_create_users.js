exports.up = function (knex) {
    try {
      return knex.schema.createTable("users", function (table) {
        table.increments();
        table.string("username").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.string("role").notNullable();
      });
    } catch (error) {
      logger.error(error);
    }
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  