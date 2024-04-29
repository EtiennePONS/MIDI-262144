import "./Navbar.css";
import { NavLink } from "react-router-dom";
import image from "../logo/favicon.ico";

const Navbar = () => {
  return (
    <nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <NavLink to="/Play" end className="nav-link">
          <img
            src={image}
            alt="LOGO"
            width="50"
            height="44"
            class="d-inline-block align-text-top"
          />
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              MIDI-262144
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              {" "}
              <li class="nav-item">
                <NavLink to="/" end className="nav-link">
                  <span class="nav-link">Home</span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/Play" end className="nav-link">
                  <span class="nav-link">Play</span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/Medias" end className="nav-link">
                  <span class="nav-link">Médias</span>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/Galerie" end className="nav-link">
                  <span class="nav-link">Images</span>
                </NavLink>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search"></form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
