const Sequelize = require('sequelize')
const { STRING, UUID, UUIDV4 } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db')

const User = conn.define('user', {
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
  password: {
    type: STRING
  }
});

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const emails = [
    { email: 'moe@moe.com', password: 'moe' },
    { email: 'foo@foo.com', password: 'foo' },
    { email: 'lucy@lucy.com', password: 'lucy' },
  ];

  const [moe, foo, lucy] = await Promise.all(emails.map(email => User.create(email)));

  return {
    moe,
    foo,
    lucy
  };
}

module.exports = {
  syncAndSeed,
  models: {
    User
  }
}
