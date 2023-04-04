import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './Home.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bkgimage1 from './bkg1.jpeg';
import bkgimage2 from './bkg2.jpg';

function Home() {
  return (
    <div className="wrapper">
      <BkgImage />
      <Header />
      <div id="track-container">
        <div>
          <div className='section-wrapper'>
            <div className="section-container">
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <h3>&nbsp;Hai sa redescoperim Romania!</h3>
            </div>
          </div>
        </div>
        <div className='section-top-svg'>
          <svg style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#D10D4E" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,234.7C384,192,480,96,576,85.3C672,75,768,149,864,170.7C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div>
          <div className='section-wrapper themed-background section-cover'>
            <div className="section-container cities-section">
              <div>
                <h3>&nbsp;Orase turistice</h3>
                <p>Iti prezentam cateva dintre cele mai frumoase orase din Romania.</p>
              </div>
              <div className='cities-show'>
                <div>
                  <h3>Bucuresti</h3>
                  <p>Despre Oras 648</p>
                  <button>Afla mai multe..</button>
                </div>
                <div>
                  <h3>Brasov</h3>
                  <p>Despre Oras 711</p>
                  <button>Afla mai multe..</button>
                </div>
                <div>
                  <h3>Timisoara</h3>
                  <p>Despre Oras 650</p>
                  <button>Afla mai multe..</button>
                </div>
                <div>
                  <h3>Constanta</h3>
                  <p>Despre Oras 656</p>
                  <button>Afla mai multe..</button>
                </div>
                <div>
                  <h3>Cluj-Napoca</h3>
                  <p>Despre Oras 652</p>
                  <button>Afla mai multe..</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='section-top-svg'>
          <svg style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#D10D4E" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,234.7C384,192,480,96,576,85.3C672,75,768,149,864,170.7C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div>
          <div className='section-wrapper'>
            <div className="section-container"><h3>&nbsp;Planifica-ti vacanta ta in Romania acum!</h3>
              <Link to='/orase'>
                <div className='section-button'>Da, vreau!</div>
              </Link>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function BkgImage() {
  // const [scrollPosition, setScrollPosition] = useState(0);
  const [source, setSource] = useState(bkgimage1);
  const handleScroll = () => {
    const position = window.pageYOffset;
    // setScrollPosition(position);
    console.log(position);
    console.log(window.outerHeight);
    if (window.outerHeight * 0.92 < position) {
      setSource(bkgimage2);
    } else {
      setSource(bkgimage1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="page-background" style={{ backgroundImage: `url(${source})` }}>
    </div>
  )
}
export default Home;