import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar({ theGivenTitle }) {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <span className="navbar-text fw-bold fs-4 text-uppercase">
          {theGivenTitle}
        </span>

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
              <li
                className="nav-item"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <NavLink to="MIDI-262144/" end className="nav-link">
                  <span className="nav-link">Home</span>
                </NavLink>
              </li>
              <li
                className="nav-item"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <NavLink to="MIDI-262144/Play" end className="nav-link">
                  <span className="nav-link">Pdf</span>
                </NavLink>
              </li>

              <li
                className="nav-item"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <NavLink to="MIDI-262144/Prompteur" end className="nav-link">
                  <span className="nav-link">Vidéo</span>
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
