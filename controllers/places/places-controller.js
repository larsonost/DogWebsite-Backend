import posts from "./places.js";
let places = posts;
import axios from "axios";
import * as placeDao from "./places-dao.js";

const createPlaces = async (req, res) => {
    const newPlace = req.body;
    console.log(newPlace)
    places.push(newPlace);
    res.json(newPlace);
}

const findPlaces  = (req, res) => { res.json(places);}
// const findDetails  = async (req, res) => {
//     const details = await placeDao.extractPlace()
//     res.json(details)
// }

const deletePlaces = (req, res) => {
    const placeToDelete = req.params.place_id;
    places = places.filter((t) =>
        t.place_id === placeToDelete);
    res.sendStatus(200);

}

const extractPlace  = async (req, res) => {
    const response = await fetch(`http://localhost:4000/api/places`).then(response => response.json())
    const place_id = response[0].placeFound.place_id;
    const placeInfo = await placeDao.extractPlace(place_id);
    console.log(placeInfo)
    res.json(placeInfo)
}


export default (app) => {
    app.post('/api/places', createPlaces);
    //app.post('/api/details', extractPlace);
    app.get('/api/places', findPlaces);
    app.get('/api/Details', extractPlace);
    app.delete('/api/places/:place_id', deletePlaces);
}

