import mongoose from 'mongoose';
import placesSchema from './place-schema.js'
const placesModel = mongoose.model('placesModel', placesSchema);
export default placesModel;