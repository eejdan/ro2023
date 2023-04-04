
const axios = require('axios');

const express = require('express');

const app = express();

const validStationIds = { "648": 1, "650": 2, "652": 3, "656": 4, "711": 5 };
app.use((req, res, next) => { console.log('received', req.url); next(); })
app.get('/api/', (req, res) => {
    console.log('Root');
    res.send("Test");
})
app.get("/api/train-routes/:date/:depstation/:arrstation/:people", (req, res, next) => {
    let date = Date.parse(req.params.date);
    if (isNaN(date)) {
        return res.status(400).send("Data plecarii invalida.");
    }
    if (!validStationIds[req.params.depstation]
        || !validStationIds[req.params.arrstation]) {
        return res.status(400).send("Id statii invalid");
    }
    if (typeof parseInt(req.params.people) != 'number' || parseInt(req.params.people) == 0) {
        return res.sendStatus(400);
    }
    next();
}, async (req, res) => {
    var orderRequestBody = {
        "passengers": {
            "adults": parseInt(req.params.people),
            "children": 0,
            "children_age": []
        },
        "legs": {
            "1": {
                "departure_date": req.params.date,
                "departure_station": parseInt(req.params.depstation),
                "arrival_station": parseInt(req.params.arrstation)
            }
        }
    }
    console.log(JSON.stringify(orderRequestBody))
    var orderResponse = await axios.post("https://rail.ninja/api/v1/booking?_format=json", orderRequestBody)
    var orderId = orderResponse.data;
    var routesResponse = await axios.get("https://rail.ninja/api/v1/booking/"+orderId+"/1/timetable?_format=json")
    res.sendStatus(200);
})
app.listen(3001, () => { console.log("Started test") })