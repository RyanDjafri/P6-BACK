//Mongoose
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.n0zszdh.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(() => console.log("Connected to mongo"))
  .catch((err) => console.log("Error connecting to Mango", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

module.exports = { mongoose, User };
