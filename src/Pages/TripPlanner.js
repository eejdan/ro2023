import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

import Header from "../components/Header";
import Footer from "../components/Footer";

import './TripPlanner.css'
import db from './Cities/manifest'

const cityTrainDistances = {
    'cluj-napoca': {
        'cluj-napoca': 0,
        'brasov': 383,
        'bucuresti': 621,
        'timisoara': 330,
        'constanta': -1
    },
    'brasov': {
        'cluj-napoca': 383,
        'brasov': 0,
        'bucuresti': 166,
        'timisoara': -1,
        'constanta': 391
    },
    'bucuresti': {
        'cluj-napoca': 383,
        'brasov': 166,
        'bucuresti': 0,
        'timisoara': 533,
        'constanta': 225
    },
    'timisoara': {
        'cluj-napoca': 330,
        'brasov': -1,
        'bucuresti': 533,
        'timisoara': 0,
        'constanta': -1
    },
    'constanta': {
        'cluj-napoca': -1,
        'brasov': 391,
        'bucuresti': 225,
        'timisoara': -1,
        'constanta': 0
    },
}
const stationIds = {
    'bucuresti': '10017',
    'timisoara': '11906',
    'cluj-napoca': '32015',
    'brasov': '30691',
    'constanta': '80892'
}
const invalidConnections = {
    "bucuresti": {}, "timisoara": { "brasov": "bucuresti", "constanta": "bucuresti" }, "brasov": { "timisoara": "bucuresti" }, "cluj-napoca": { "constanta": "bucuresti" }, "constanta": { "timisoara": "bucuresti", "cluj-napoca": "bucuresti" }
};

const vehicleSelectChoices = [
    { value: 'car', label: 'Masina Personala' },
    { value: 'train', label: 'Trenul' }
]
const cityOptions = [
    { value: 'bucuresti', label: 'Bucuresti' },
    { value: 'cluj-napoca', label: 'Cluj-Napoca' },
    { value: 'brasov', label: 'Brasov' },
    { value: 'timisoara', label: 'Timisoara' },
    { value: 'constanta', label: 'Constanta' },
]
var postCityOptions = [
    { value: 'bucuresti', label: 'Bucuresti' },
    { value: 'cluj-napoca', label: 'Cluj-Napoca' },
    { value: 'brasov', label: 'Brasov' },
    { value: 'timisoara', label: 'Timisoara' },
    { value: 'constanta', label: 'Constanta' },
]
const algOptions = [
    { value: 'manual', label: 'Stiu unde vreau sa merg!' },
    { value: 'guided', label: 'Pe unde pot sa merg?' }
]
const guidedTripTagOptions = [
    { value: 'natura', label: 'Natura' },
    { value: 'urbanism', label: 'Urbanism' },
    { value: 'cetate', label: 'Cetati' },
    { value: 'universitar', label: 'Universitati' },
    { value: 'munte', label: 'Munti' },
    { value: 'mare', label: 'Marea' },
    { value: 'padure', label: 'Paduri' },
    { value: 'piata_alee_istorica', label: 'Piete si alei istorice' },
    { value: 'catedrala', label: 'Catedrale' },
    { value: 'modernism', label: 'Modernism' },
    { value: 'cladire_politica', label: 'Cladiri Politice' },
]

function TripPlanner() {
    const [vehicleChoice, setVehicleChoice] = useState('car');
    const [depDate, setDepDate] = useState(Date.now());
    const [departureChoice, setDepartureChoice] = useState('unselected');

    const [algChoice, setAlgChoice] = useState(null);
    const [manualDisplay, setManualDisplay] = useState("none");
    const [guidedDisplay, setGuidedDisplay] = useState("none");
    const [guidedTagsDisplay, setGuidedTagsDisplay] = useState("block");

    useEffect(() => {
        if (algChoice === 'manual') {
            setGuidedDisplay("none");
            setManualDisplay("block");
        } else if (algChoice === 'guided') {
            setManualDisplay("none");
            setGuidedDisplay("flex");
        } else {
            setGuidedDisplay("none");
            setManualDisplay("none");
        }
    }, [algChoice])

    const [manualCities, setManualCities] = useState([]);
    const [guidedRange, setGuidedRange] = useState(2);
    const [guidedTags, setGuidedTags] = useState([]);

    const [formResultScale, setFormResultScale] = useState('0%');
    const [formResult, setFormResult] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormResultScale('100%');
        setTimeout(() => {

        }, 200)
    }
    const handleRangeChange = (value) => {
        setGuidedRange(value);
        if (value > 4) {
            setGuidedTagsDisplay("none")
        } else {
            if (guidedTagsDisplay != 'block')
                setGuidedTagsDisplay('block');
        }
    }
    const calculateTripRoute = (cities) => {
        let minDistance = 9999;
        let minDistanceRoute = [];
        let count = cities.length;
        function getConnectionDistance(dep, arr) {
            if (cityTrainDistances[dep][arr] == -1)
                return getConnectionDistance(dep, invalidConnections[dep][arr])
                    + getConnectionDistance(invalidConnections[dep][arr], arr);
            return cityTrainDistances[dep][arr];
        }
        function calculateStivaDistance(st, k) {
            let sum = 0;
            for (let i = 0; i < k; i++) {
                sum += getConnectionDistance(cities[st[i]], cities[st[i + 1]]);
            }
            return sum;
        }
        let st = [];
        function bk(k) {
            for (let i = 1; i < cities.length; i++) {
                st[k] = i;
                if (valid(k)) {
                    if (sol(k)) {
                        let dist = calculateStivaDistance(st, k);
                        if (dist < minDistance) {
                            minDistanceRoute = JSON.parse(JSON.stringify(st));
                            minDistance = dist;
                        }
                    } else {
                        bk(k + 1);
                    }
                }
            }
        }
        function valid(k) {
            for (let i = 0; i < k; i++) {
                for (let j = i + 1; j <= k; j++) {
                    if (st[i] == st[j])
                        return false;
                }
            }
            return true;
        }
        function sol(k) {
            if (k == cities.length - 1) return true; else return false;
        }
        st[0] = 0;
        bk(1);
        let newRoute = [];
        minDistanceRoute.forEach((r) => { newRoute.push(cities[r]); })
        return newRoute;
    }
    const handleSubmitManual = (e) => {
        let newCities = [];
        let depCity = departureChoice;
        manualCities.forEach(city => {
            let already = false;
            newCities.forEach(newCity => {
                if (newCity == city)
                    already = true;
            })
            if (!already && city != depCity) newCities.push(city.value);
        })
        newCities.unshift(depCity)
        let route = calculateTripRoute(newCities);
    }
    const calculateTrainTrip = (trip) => {
        var newTrip = [];
        for (let i = 0; i < (trip.length - 1); i++) {
            if (cityTrainDistances[trip[i]][trip[i + 1]] > 0) {
                newTrip.push(trip[i]);
            } else newTrip.push(trip[i], invalidConnections[trip[i]][trip[i + 1]]);
        }
        newTrip.push(trip[trip.length - 1]);
        return newTrip;
    }
    const handleSubmitGuided = (e) => {
        let depCity = departureChoice;
        var tripRoute = [];
        var tripTrainRoute = [];
        if (guidedRange < 5) {
            let newTags = [];
            guidedTags.forEach(tag =>
                newTags.push(tag.value)
            )
            let positiveScores = [];
            // let negativeScores = {};
            db.cities.forEach(city => {
                let score = 0;
                // negativeScores[city] = 0;
                newTags.forEach(tag => {
                    if (db[city].tags[tag]) {
                        if (db[city].tags[tag] == true) {
                            score++;
                        }
                    }
                })
                positiveScores.push({ city: city, score: score });
            })
            let sortedScores = positiveScores.sort((a, b) => { if (a['score'] < b['score']) return 1; else return -1; });
            sortedScores = sortedScores.slice(0, (guidedRange));
            let newRoute = [];
            newRoute.push(depCity)
            sortedScores.forEach(score => {
                if (depCity != score.city) newRoute.push(score.city);
            })
            tripRoute = newRoute;
        } else {
            tripRoute = calculateTripRoute(['bucuresti', 'brasov', 'cluj-napoca', 'timisoara', 'constanta']);
        }
        console.log(tripRoute);
        var newTable;
        if (vehicleChoice == 'car') {
            let newTrs = [];
            newTrs.push({ 0: '0', 1: 'Data plecarii:' + depDate, 2: '' })
            let count = 0;

            tripRoute.forEach(city => {
                count++;
                newTrs.push({
                    0: '' + count + '',
                    1: 'Vizita oras - ' + db[city].title,
                    2: db[city].visit+' zile'
                })
            })
            let newRows = newTrs.map(tr => <tr>
                <td>{tr[0]}</td>
                <td>{tr[1]}</td>
                <td>{tr[2]}</td>
            </tr>)
            newTable = <table><tbody>
                {newRows}
            </tbody></table>
            setFormResult(newTable);
            return;
        }
        var TrainTripRoute = calculateTrainTrip(tripRoute);
        let newTrs = [];
        newTrs.push({ 0: '0', 1: 'Data plecarii: ' + new Date(depDate).toLocaleDateString('ro-RO'), 2: '' })
        let count = 0;

        tripRoute.forEach(city => {
            count++;
            newTrs.push({
                0: '' + count + '',
                1: 'Vizita oras - ' + db[city].title,
                2: db[city].visit+' zile'
            })
            newTrs.push({
                0: '',
                1: 'Zi tranzit - plecare din:' + db[city].title,
                2: ''
            })
        })
        let newRows = newTrs.map(tr => <tr>
            <td>{tr[0]}</td>
            <td>{tr[1]}</td>
            <td>{tr[2]}</td>
        </tr>)
        newTable = <table><tbody>
            {newRows}
        </tbody></table>
        setFormResult(newTable);
    }
    useEffect(() => {
        let a = document.getElementById('date-input');
        a.valueAsDate = new Date();
    }, [])
    return (
        <div className="tp-page-wrapper">
            <Header />
            <div className="tp-wrapper">
                <div className="tp-container">
                    <div className="tp-form-wrapper">
                        <div className="tp-form">
                            <div style={{ marginBottom: "10px" }}>Planificator calatorie</div>
                            <form onSubmit={handleSubmit}>
                                <div>Vreau sa calatoresc cu:</div>
                                <div>
                                    <Select
                                        id="vehicle-select"
                                        options={vehicleSelectChoices}
                                        onChange={(choice) => {
                                            setVehicleChoice(choice.value);
                                        }}
                                        placeholder={"Alege tipul de vehicul"}
                                    />
                                </div>

                                <label htmlFor="date-input">In data de:</label><br />
                                <input id="date-input" type="date" onChange={(e) => {
                                    setDepDate(e.target.valueAsDate);
                                }}></input>
                                <br />
                                <label htmlFor="departure-city-input">Plecand din orasul:</label>
                                <Select id="departure-city-input"
                                    options={cityOptions}
                                    onChange={(choice) => {
                                        setDepartureChoice(choice.value);
                                    }}
                                    placeholder={"Alege orasul.."}
                                />
                                {/* <span style={{width: "100%", display: "flex", justifyContent:"flex-end",
                                alignItems: 'baseline'}}><label><small><label>Viziteaza?</label></small></label><input type='checkbox'></input></span> */}
                                <span className='separator' style={{ margin: '10px 0' }}></span>
                                <Select id="alg-input"
                                    options={algOptions}
                                    onChange={(choice) => {
                                        setAlgChoice(choice.value)
                                    }}
                                    placeholder={"Unde vrei sa mergi?"}
                                />
                                <span className='separator' style={{ margin: '10px 0' }}></span>
                                <div className='tp-form-manual'
                                    style={{ display: manualDisplay }}
                                >
                                    <label htmlFor='manual-cities-input'>Vreau sa vizitez orasele:</label>
                                    <Select id="manual-cities-input"
                                        options={postCityOptions} isMulti
                                        onChange={(choice) => {
                                            setManualCities(choice)
                                        }}
                                    >

                                    </Select>
                                    <button onClick={handleSubmitManual}>Vezi</button>
                                </div>
                                <div className='tp-form-guided'
                                    style={{ display: guidedDisplay }}
                                >
                                    <label>Cate orase vrei sa vizitezi? {guidedRange}</label>
                                    <input type="range" min="2" max="5" defaultValue='2' onChange={e => {
                                        handleRangeChange(e.target.value);
                                    }}></input>
                                    <span style={{ display: guidedTagsDisplay }}>
                                        <label htmlFor='guided-tags-input'>Ce iti place sa vezi mai mult? <small>Selecteaza mai multe:</small></label>
                                        <Select id="guided-tags-input"
                                            options={guidedTripTagOptions} isMulti
                                            onChange={(choice) => {
                                                setGuidedTags(choice)
                                            }}
                                            placeholder={"Caracteristici"}
                                        ></Select>
                                    </span>
                                    <button onClick={handleSubmitGuided}>Arata-mi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="tp-form-result-wrapper">
                        <div className="tp-form-result" style={{ scale: formResultScale }}>
                            {formResult}
                            {/* <table>
                                <tbody>
                                    <tr>
                                        <td>0</td>
                                        <td>Data plecarii: 01.01.2023</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Vizita oras - Cluj-Napoca</td>
                                        <td>3 zile</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div>attr1</div>
                                            <div>attr2</div>
                                            <div>attr3</div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Zi tranzit Cluj-Napoca -&gt; Bucuresti</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div>Cluj sta1</div>
                                            <div>trenuri</div>
                                            <div>sta1 Bucuresti</div>
                                            <div>trenuri</div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Vizita oras - Bucuresti</td>
                                        <td>3 zile</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div>attr1</div>
                                            <div>attr2</div>
                                            <div>attr3</div>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TripPlanner;