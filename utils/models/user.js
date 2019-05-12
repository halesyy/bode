// class User extends Model {}
GlobalDB.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: Sequelize.STRING(55),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
});
