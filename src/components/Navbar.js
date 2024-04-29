import "./Navbar.css";
import { NavLink } from "react-router-dom";
import image from "../logo/favicon.ico";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink to="MIDI-262144/Play" end className="nav-link">
          <img
            src={image}
            alt="LOGO"
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              MIDI-262144
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              {" "}
              <li className="nav-item">
                <NavLink to="MIDI-262144/" end className="nav-link">
                  <span className="nav-link">Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="MIDI-262144/Play" end className="nav-link">
                  <span className="nav-link">Play</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="MIDI-262144/Medias" end className="nav-link">
                  <span className="nav-link">Médias</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="MIDI-262144/Galerie" end className="nav-link">
                  <span className="nav-link">Images</span>
                </NavLink>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search"></form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
