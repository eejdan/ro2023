
import './Home.css';
import Header from '../components/Header';

function Home() {
    return (
        <div className="wrapper">
          <Header />
          <div id="track-container">
            <section>
              Section 1
            </section>
          </div>
          <div id="footer">
            Proiect executat de echipa Agape si Metanoia
          </div>
        </div>
    );
}
export default Home;