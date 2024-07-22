import sequelize from './shared/database/database.js';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});
