import mongoose from 'mongoose';
const schema = mongoose.Schema({
    city: String,
    reviews: Array,
    hotel: {name: String, address: String, image:String},
    hospital: {name: String, address: String, image:String},
    place_id: String

}, {collection: 'places'});
export default schema;