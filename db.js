import mongoose from 'mongoose';

const connectToMongo = () => {
  mongoose
    .connect('mongodb://localhost:27017', {
      dbName: 'testDB',
      user: 'root',
      pass: 'example',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to the DB succesully');
    })
    .catch((err) => {
      console.log(`DB connection err:, ${err}`);
    });
};

export default connectToMongo;
