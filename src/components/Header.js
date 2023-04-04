

import { Link } from 'react-router-dom'

import './Header.css'
import team from '../team.svg'
import project from '../project.svg'


function Header() {
    return (
        <div id='header' className="header-wrapper">
            <div className="header-container">
                <div><Link to="/"><img height='36' src={project} alt='logo'></img></Link></div>
                <div className="header-navigation">
                    <div className="_nav-item-wrapper">
                        <Link to='/orase'>
                            <div className="_nav-item-container">
                                Orase
                            </div></Link>
                    </div>
                    <div className="_nav-item-wrapper">
                        <Link to='/calatorie'>
                            <div className="_nav-item-container">
                                Calatorie
                            </div>
                        </Link>
                    </div>
                </div>
                <div><img height='56' src={team} alt='logo'></img></div>
            </div>
        </div>
    )
}

export default Header;