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
  gt: async function(query, bind = false) {
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

// Shorthand string prototype's for DB
String.prototype.get = async function(callback = false) {
  const rows = await gt(this); // this = "SELECT * FROM users"
  return rows;
}
String.prototype.bound = async function(binds, callback = false) {

  var query = this;
  var rows = await gt(query, binds);
  // return await gt(query, );
  if (callback !== false) callback(rows);
  return rows;
}

/*
 * Push
 */
module.exports = {
  Interact: Interact,
  seqdb: db,
}
