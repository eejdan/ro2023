import { useLocation } from 'react-router-dom';

import db from './Cities/manifest'

import Header from '../components/Header';
import Footer from '../components/Footer';
import './City.css'

function City() {
    var location = useLocation();
    location = location.pathname.split("/").slice(-1)[0];
    return (
        <div className="city-page-wrapper">
            <BkgImage city={location} />
            <Header />
            <div className="city-content-wrapper">
                <div className="city-content">
                    <div className="city-content-">{location}</div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
function BkgImage(props) {
    return (
        <div className='city-page-bkg'>
            <img src={process.env.PUBLIC_URL + '/cities/' +props.city+ '/default.jpg'}></img>
        </div>
    )
}

export default City;