import './Header.css'
import team from './team.svg'
import project from './project.svg'
function Header() {
    return (
        <div id='header' className="header-wrapper">
            <div className="header-container">
                <div><img height='36' src={project} alt='logo'></img></div>
                <div className="header-navigation">
                    <div className="_nav-item-wrapper">
                        <div className="_nav-item-container">
                            Test
                        </div>
                    </div>
                    <div className="_nav-item-wrapper">
                        <div className="_nav-item-container">
                            Test
                        </div>
                    </div>
                </div>
                <div><img height='56' src={team} alt='logo'></img></div>
            </div>
        </div>
    )
}

export default Header;