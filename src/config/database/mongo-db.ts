import mongoose from 'mongoose';

export async function initDatabase() {
  const MONGODB_URI =
    process.env.MONGODB_URI ||
    'mongodb+srv://mongo-db:27032@ozmap-challenge.jgwaeyh.mongodb.net/';

  mongoose.connect(MONGODB_URI).catch((err) => {
    throw new Error(err);
  });

  mongoose.connection.on('connected', () => {
    console.log('Connection to db successfully established!');
  });

  mongoose.connection.on('error', (err) => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected!');
  });
}

export default initDatabase();
