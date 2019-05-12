const dbconfig = require("../config/database")
const Sequelize = require("sequelize");
const params = dbconfig.params;
const db = new Sequelize(params.database, params.username, params.password, {
  host: params.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: params.logging
});
global.Sequelize = Sequelize
global.GlobalDB = db

/*
 * Requires "global.GlobalDB" to run effectively.
 */
const Interact = {
  gt: function(query, bind) {
    const q = query;
    const b = bind;
    return new Promise((resolve, reject) => {
      GlobalDB.query(q, {
        replacements: b,
        type: Sequelize.QueryTypes.SELECT
      }).then(function(rows){
        resolve(rows);
      });
    });
  }
}

// Shorthand calls to database.
global.gt = Interact.gt;

// Table models
// global.Model = Sequelize.Model
require("./models");
GlobalDB.sync({ force: params.sync });

/*
 * Push
 */
module.exports = {
  Interact: Interact,
  seqdb: db,
}
