
const express = require('express');
const { parse } = require('node-html-parser');
const axios = require('axios');


const app = express();

const validStationIds = { "10017": 1 /* bucuresti */, "11906": 2 /* timisoara */, "30691": 3 /* brasov */, "32015": 4 /* cluj */, "80892": 5 /* constanta */};
const invalidConnections = { "10017": {} /* bucuresti */, "11906": { "30691": "10017", "80892": "10017" } /* timisoara */, "30691": { "11906": "10017" } /* brasov */, "32015": { "80892": "10017" } /* cluj */, "80892": { "11906": "10017", "32015": "10017" } /* constanta */};
app.use((req, res, next) => { console.log('received', req.url); next(); })
app.get('/api/', (req, res) => {
    console.log('Root');
    res.send("Root");
})
app.get("/api/train-routes/:date/:depstation/:arrstation", (req, res, next) => {
    let date = Date.parse(req.params.date);
    if (isNaN(date)) {
        return res.status(400).send("Data plecarii invalida.");
    }
    if (!validStationIds[req.params.depstation]
        || !validStationIds[req.params.arrstation]) {
        return res.status(400).send("Id statii invalid");
    }
    next();
}, async (req, res) => {
    var requestUrlParameters = new URLSearchParams({ 
        "action": "route",
        "search[CodStaOrigine]": req.params.depstation,
        "search[CodStaDest]": req.params.arrstation,
        "date": req.params.date
    });
    var response = await axios.post("https://mersultrenurilor.ro/wp-admin/admin-ajax.php", requestUrlParameters);
    var routes = []
    var routesRoot = parse(response.data);
    let trains = routesRoot.querySelectorAll('tr.available');
    trains.forEach(train => {
        let newRoute = {
            times: '',
            link: '',
            number: ''
        }
        newRoute.times = train.querySelector('.travel_hours').textContent;
        let tnElement = train.querySelector(".train_name > a");
        newRoute.link = tnElement.getAttribute('href')
        newRoute.number = tnElement.textContent;
        routes.push(newRoute);
    })
    res.status(200).send(routes);
})
app.listen(3001, () => { console.log("Started test") })
    



/*  if (typeof parseInt(req.params.people) != 'number' || parseInt(req.params.people) == 0) {
        return res.sendStatus(400);
} */