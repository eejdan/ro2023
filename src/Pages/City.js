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
                <div className="city-content-card">
                    <div className="city-content-title">{db[location]['title']}</div>
                    <div className="city-content-desc">{db[location]['desc']}</div>
                </div>
                <div className="city-content-card" style={{textAlign: 'center', padding: "20px", fontSize: "1.6rem", fontStyle: "italic"}}>
                        Atractii
                </div>
                <div className="city-content-card">
                    <div className="city-content-title">{db[location]['attractions']['0']['title']}</div>
                    <div className="city-content-att-main-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['0']['photos']['0']}></img>
                    </div>
                    <div className="city-content-desc">{db[location]['attractions']['0']['desc']}</div>
                    <div className="fiftyflex city-content-att-sec">
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['0']['photos']['1']}></img>
                        </div>
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['0']['photos']['2']}></img>
                        </div>
                    </div>
                </div>
                <div className="city-content-card">
                    <div className="city-content-title">{db[location]['attractions']['1']['title']}</div>
                    <div className="city-content-att-main-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['1']['photos']['0']}></img>
                    </div>
                    <div className="city-content-desc">{db[location]['attractions']['1']['desc']}</div>
                    <div className="fiftyflex city-content-att-sec">
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['1']['photos']['1']}></img>
                        </div>
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['1']['photos']['2']}></img>
                        </div>
                    </div>
                </div>
                <div className="city-content-card">
                    <div className="city-content-title">{db[location]['attractions']['2']['title']}</div>
                    <div className="city-content-att-main-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['2']['photos']['0']}></img>
                    </div>
                    <div className="city-content-desc">{db[location]['attractions']['2']['desc']}</div>
                    <div className="fiftyflex city-content-att-sec">
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['2']['photos']['1']}></img>
                        </div>
                        <div className="city-content-att-sec-image">
                            <img alt='' src={process.env.PUBLIC_URL + db[location]['attractions']['2']['photos']['2']}></img>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
function BkgImage(props) {
    return (
        <div className='city-page-bkg'>
            <img  alt='' src={process.env.PUBLIC_URL + '/cities/' +props.city+ '/default.jpg'}></img>
        </div>
    )
}

export default City;