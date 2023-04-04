import { useRef, useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import './Cities.css'

function Cities() {
    const [left, setLeft] = useState(0);
    const [position, setPosition] = useState("initial");
    setTimeout(() => {
        setPosition("absolute");
        setLeft("-30vw");
    }, 3000)
    return (
        <div className="wrapper">
            <Header />
            <div className="cities-wrapper">
                <div className="cities-select">abc</div>
                <div className="cities-carousel">
                    <div style={{ border: '1px solid black', borderRadius: '40px', width: "100px", position: position, height: '100px', "transition": "left 3s position 3s", left: left}}>
                        abc
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
    
}
function CityCard() {
    return (
        <div></div>
    )
}
export default Cities;