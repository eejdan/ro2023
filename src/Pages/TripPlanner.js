
import Header from "../components/Header";
import Footer from "../components/Footer";

import './TripPlanner.css'

function TripPlanner() {
    return (
        <div className="tp-wrapper">
            <Header />
            <div className="tp-container">
                <div className="tp-form-wrapper">
                    Test
                </div>
                <div className="tp-form-result-wrapper">
                    Result
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TripPlanner;