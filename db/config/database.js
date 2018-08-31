const defaultSettings = {
  username: process.env.POSTGRESQL_USER || 'postgres',
  password: process.env.POSTGRESQL_PASSWORD || '',
  host: process.env.POSTGRESQL_HOST || 'localhost',
  dialect: 'postgres',
  define: {
    underscored: true,
    charset: 'utf8',
    timestamps: true,
  },
};

module.exports = {
  development: {
    ...defaultSettings,
    database: 'payment_development',
  },
  test: {
    ...defaultSettings,
    logging: false,
    database: 'state_machine_test',
  },
};
