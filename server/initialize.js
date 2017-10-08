import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

// Config
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Define MongoDB tables
const commentSchemaConfig = {
  userid: String,
  comment: String,
};

/**
 * Initializes MongoDB tables.
 */
const mongodb = mongoose.connection;
const Schema = mongoose.Schema;
mongodb.on('error', console.error.bind(console, 'connection error:'));
mongodb.once('open', () => {
  // if connection open succeeds print out the following in the console
  console.log('open: success');
});
autoIncrement.initialize(mongodb);

const commentSchema = new Schema(commentSchemaConfig);
commentSchema.plugin(autoIncrement.plugin, 'Comment');
const Comment = mongoose.model('Comment', commentSchema);

export { Comment };
