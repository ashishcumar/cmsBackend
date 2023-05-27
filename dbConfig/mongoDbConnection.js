const mongoose = require("mongoose");
const process = require("process");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('connection is stablished' + connect.connection.host + ' ' + connect.connection.name)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectDb;
