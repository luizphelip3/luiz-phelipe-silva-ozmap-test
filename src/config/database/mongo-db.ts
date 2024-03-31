import mongoose from 'mongoose';

export async function initMongoDatabase() {
  const MONGODB_URI =
    process.env.MONGODB_URI ||
    'mongodb+srv://mongo-db:27032@ozmap-challenge.jgwaeyh.mongodb.net/';

  mongoose.connect(MONGODB_URI)
    .then( () => {
        console.log('Connection to database successfully established!')
    })
    .catch( (err) => {
        console.error(`Mongoose connection to database failed. Error: ${err}`);
    })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from database!');
  });
}

export default initMongoDatabase();
