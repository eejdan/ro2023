import { useEffect, useState } from 'react';
// import axios from 'axios';
import Select from 'react-select';

import Header from "../components/Header";
import Footer from "../components/Footer";

import './TripPlanner.css'
import db from './Cities/manifest'

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
const algOptions = [
    { value: 'manual', label: 'Stiu unde vreau sa merg!'},
    { value: 'guided', label: 'Pe unde pot sa merg?'}
]
const guidedTripTagOptions = [
    { value: 'natura', label: 'Natura'},
    { value: 'urbanism', label: 'Urbanism'},
    { value: 'cetati', label: 'Cetati'},
    { value: 'universitati', label: 'Universitati'},
    { value: 'munte', label: 'Munti'},
    { value: 'mare', label: 'Marea'},
    { value: 'padure', label: 'Paduri'},
    { value: 'piata_alee_istorica', label: 'Piete si alei istorice'},
    { value: 'catedrala', label: 'Catedrale'},
    { value: 'modernism', label: 'Modernism'},
    { value: 'cladire_politica', label: 'Cladiri Politice'},
]

function TripPlanner() {
    const [vehicleChoice, setVehicleChoice] = useState('car');
    const [departureChoice, setDepartureChoice] = useState('unselected');

    const [algChoice, setAlgChoice] = useState(null);
    const [manualDisplay, setManualDisplay] = useState("none");
    const [guidedDisplay, setGuidedDisplay] = useState("none");

    useEffect(() => {
        if(algChoice === 'manual') {
            setGuidedDisplay("none");
            setManualDisplay("block");
        } else if(algChoice === 'guided') {
            setManualDisplay("none");
            setGuidedDisplay("flex");
        } else {
            setGuidedDisplay("none");
            setManualDisplay("none");
        }
    }, [algChoice])

    const [manualCities, setManualCities] = useState([]);
    const [guidedTags, setGuidedTags] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // let vehicle = vehicleChoice;


    }

    return (
        <div className="tp-page-wrapper">
            <Header />
            <div className="tp-wrapper">
                <div className="tp-container">
                    <div className="tp-form-wrapper">
                        <div className="tp-form">
                            <div style={{marginBottom: "10px"}}>Planificator calatorie</div>
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
                                <input id="date-input" type="date"></input>
                                <br />
                                <label htmlFor="departure-city-input">Plecand din orasul:</label>
                                <Select id="departure-city-input"
                                    options={cityOptions}
                                    onChange={(choice) => {
                                        setDepartureChoice(choice.value)
                                    }}
                                    placeholder={"Alege orasul.."}
                                />
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
                                    style={{display: manualDisplay }}
                                    >
                                    <label htmlFor='manual-cities-input'>Vreau sa vizitez orasele:</label>
                                    <Select id="manual-cities-input"
                                     options={cityOptions} isMulti
                                     onChange={(choice) => {
                                        setManualCities(choice)
                                     }}
                                     >

                                     </Select>
                                </div>
                                <div className='tp-form-guided'
                                    style={{display: guidedDisplay }}
                                    >
                                    <label>Cate orase vrei sa vizitezi?</label>
                                    <input type="range" min="1" max="5"></input>
                                    <label>Ce iti place sa vezi mai mult?</label>
                                    <Select id="guided-tags-input"
                                        options={guidedTripTagOptions} isMulti
                                        onChange={(choice) => {
                                            setGuidedTags(choice)
                                        }}
                                        placeholder={"Caracteristici"}
                                    ></Select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="tp-form-result-wrapper">
                        <div className="tp-form-result">
                            Test
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TripPlanner;