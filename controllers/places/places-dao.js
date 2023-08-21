import placeModel from './places-model.js';

export const extractPlace = (place_id) => placeModel.find({place_id: place_id});

