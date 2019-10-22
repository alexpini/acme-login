const Sequelize = require('sequelize')
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db')

const User = conn.define('users', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  email: {
    type: STRING,
    validate: {
      isEmail: true
    }
  },
  password: STRING
});


module.exports = User
