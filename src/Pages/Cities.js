import { useState } from 'react';
import Select from 'react-select';

import Footer from '../components/Footer';
import Header from '../components/Header';
import './Cities.css'

import db from './Cities/manifest';

const options = [
    { value: 'bucuresti', label: 'Bucuresti'},
    { value: 'cluj-napoca', label: 'Cluj-Napoca'},
    { value: 'brasov', label: 'Brasov'},
    { value: 'timisoara', label: 'Timisoara'},
    { value: 'constanta', label: 'Constanta'},
]


function Cities() {
    const [opacity, setOpacity] = useState("100%");
   /*  setTimeout(() => {
        setOpacity("0%");
    }, 3000) */
    return (
        <div className="ct-wrapper">
            <Header />
            <div className="cities-wrapper">
                <div className="cities-select"><div className="cities-select-container"><Select options={options} /></div></div>
                <div className="city-wrapper">
                    &nbsp;
                    <div className="city-container" style={{ "transition": "opacity 3s", opacity: opacity}}>
                        <div className="city-title">Cluj-Napoca</div>
                        <div className="city-tiles">
                            <div className="city-tile-row">
                                <div className="city-description">Municipiul Cluj-Napoca este un centru universitar prestigios și un oraș înfloritor. S-a făcut cunoscut pe plan național și chiar internațional, fiind în permanență gazda unor festivaluri muzicale, sportive, concerte, expoziții și numeroase alte evenimente culturale importante.
Există multe atracții turistice în Cluj-Napoca și în apropiere, făcându-l o destinație de vacanță potrivită.</div>
                                <div className="city-attraction">Att1</div>
                            </div>
                            <div className="city-tile-row">
                                <div className="city-attraction">Att2</div>
                                <div className="city-attraction">Att2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
    
}
export default Cities;