import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import Footer from '../components/Footer';
import Header from '../components/Header';
import './Cities.css'

import db from './Cities/manifest';

const options = [
    { value: 'bucuresti', label: 'Bucuresti' },
    { value: 'cluj-napoca', label: 'Cluj-Napoca' },
    { value: 'brasov', label: 'Brasov' },
    { value: 'timisoara', label: 'Timisoara' },
    { value: 'constanta', label: 'Constanta' },
]


function Cities() {
    const [currentCity, setCurrentCity] = useState('cluj-napoca');

    const [opacity, setOpacity] = useState("100%");
    const [cityTitle, setCityTitle] = useState(db['cluj-napoca'].title);
    const [cityDesc, setCityDesc] = useState(db['cluj-napoca'].desc);
    const [attrOne, setAttrOne] = useState(db['cluj-napoca'].attractions['0'].title)
    const [linkOne, setLinkOne] = useState(db['cluj-napoca'].attractions['0'].photos['0']);
    const [attrTwo, setAttrTwo] = useState(db['cluj-napoca'].attractions['1'].title)
    const [linkTwo, setLinkTwo] = useState(db['cluj-napoca'].attractions['1'].photos['0']);
    const [attrThree, setAttrThree] = useState(db['cluj-napoca'].attractions['2'].title)
    const [linkThree, setLinkThree] = useState(db['cluj-napoca'].attractions['2'].photos['0']);

    const handleChangeCity = (newCity) => {
        if(newCity === currentCity) return;
        setOpacity("0%");
        setTimeout(() => {
            setCityTitle(db[newCity].title)
            let desc = db[newCity].desc;
            if(desc.length > 500) {
                desc = desc.slice(0, 500);
                desc = desc + '(...)';
            }
            setCityDesc(desc);
            setAttrOne(db[newCity].attractions['0'].title)
            setLinkOne(db[newCity].attractions['0'].photos['0'])
            setAttrTwo(db[newCity].attractions['1'].title)
            setLinkTwo(db[newCity].attractions['1'].photos['0'])
            setAttrThree(db[newCity].attractions['2'].title)
            setLinkThree(db[newCity].attractions['2'].photos['0'])
            setOpacity("100%");
            setCurrentCity(newCity);
        }, 300)
    }
    return (
        <div className="ct-wrapper">
            <Header />
            <div className="cities-wrapper">
                <div className="cities-select"><div className="cities-select-container">
                <Select options={options}
                    onChange={(choice) => {
                        handleChangeCity(choice.value)
                    }}
                    placeholder={"Alege un oras"} /></div></div>
                <div className="city-wrapper">
                    &nbsp;
                    <div className="city-container" style={{ "transition": "opacity 300ms", opacity: opacity }}>
                        <div className="city-title">{cityTitle}</div>
                        <div className="city-tiles">
                            <div className="city-tile-row">
                                <div className="city-description">
                                    <div>{cityDesc}</div>
                                    <div className="city-find-out-more"><Link to={'/oras/'+currentCity}>Mai multe despre oras</Link></div>
                                </div>
                                <div className="city-attraction">
                                    <img alt='' src={process.env.PUBLIC_URL + linkOne}></img>
                                    <div>{attrOne}</div>
                                </div>
                            </div>
                            <div className="city-tile-row">
                                <div className="city-attraction">
                                    <img alt='' src={process.env.PUBLIC_URL + linkTwo}></img>
                                    <div>{attrTwo}</div>
                                </div>
                                <div className="city-attraction">
                                    <img alt='' src={process.env.PUBLIC_URL + linkThree}></img>
                                    <div>{attrThree}</div>
                                </div>
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