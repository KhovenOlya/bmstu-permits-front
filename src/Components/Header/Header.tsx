import "./Header.sass"
import logo from "/src/assets/logo.png"

const Header = () => {
    return (
        <div className="header-wrapper">
            <img src={logo} alt=""/>
        </div>
    )
}

export default Header;