import mongoose from 'mongoose';
const schema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  dislikes: Number,
  disliked: Boolean,
  image: String,
  time: String,
  title: String,
  username: String,
  role: String,
  seekingrole: String,
  selectedDogName: String,
  selectedDogBreed: String,
  interest: String,
  selectedproductName: String,
  selectedproductPrice: String,
  dogBreedTarget: String,
  service: String

}, {collection: 'tuits'});
export default schema;