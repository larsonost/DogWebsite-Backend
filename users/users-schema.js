import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String},
  price: { type: String}
});

const dogSchema = new mongoose.Schema({
  name: { type: String},
  breed: { type: String}
});

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: String,
  dogs: { type: [dogSchema], default: [] },
  service: String,
  products: { type: [productSchema], default: [] }
}, { collection: "users" });
export default usersSchema;