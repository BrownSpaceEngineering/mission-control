const config = {
  // Change these to localhost for local development
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/bse',
  port: process.env.PORT || 3000,
  baseURL: 'http://localhost:3000',
};

export default config;
