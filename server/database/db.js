import { mongoose } from "mongoose";
const URL = "mongodb://0.0.0.0:27017/GKDAIRY";

const connection = async () => {
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected");
  } catch (error) {
    console.log("something wrong in db.js" + error);
  }
};

export default connection;
