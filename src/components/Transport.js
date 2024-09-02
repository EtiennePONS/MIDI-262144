import "./Transport.css";
import logoRepereSuivant from "../logo/forward.png";
import logoPlay from "../logo/play.png";
import logoStop from "../logo/stop.png";
import logoReperePrecedent from "../logo/rewind.png";
import logoSuivi from "../logo/arrow.png";
import logoClick from "../logo/sound.png";

function Transport({
  suiviOn,
  suiviOff,
  precedent,
  stop,
  play,
  suivant,
  clickOn,
  clickOff,
}) {
  // Add an event listener to the checkbox
  const switchSuivi = (e) => {
    if (e.target.checked) {
      suiviOn();
      console.log("suivi-ON"); // Métronome activé
    } else {
      suiviOff();
      console.log("suivi-OFF"); // Métronome désactivé
    }
  };
  const switchClick = (e) => {
    if (e.target.checked) {
      clickOn();
      console.log("Click-ON"); // Métronome activé
    } else {
      clickOff();
      console.log("Click-OFF"); // Métronome désactivé
    }
  };

  return (
    <div className="transport fixed-bottom">
      <input
        type="checkbox"
        className="btn-check"
        id="suivi"
        autoComplete="off"
        onChange={switchSuivi}
      />
      <label
        className="btn btn-outline-secondary btn-lg fw-bold fs-4 text-uppercase rose-ebony"
        htmlFor="suivi"
      >
        <img
          className="logo"
          src={logoSuivi}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </label>
      <button
        type="button"
        className="btn precedent btn-primary btn-lg fw-bold fs-4 text-uppercase"
        onClick={precedent}
      >
        <img
          className="logo"
          src={logoReperePrecedent}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </button>
      <button
        type="button"
        className="btn stop btn-danger btn-lg fw-bold fs-4 text-uppercase"
        onClick={stop}
      >
        <img
          className="logo"
          src={logoStop}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </button>
      <button
        type="button"
        className="btn btn-warning play btn-lg fw-bold fs-4 text-uppercase"
        onClick={play}
      >
        <img
          className="logo"
          src={logoPlay}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </button>
      <button
        type="button"
        className="btn suivant btn-success btn-lg fw-bold fs-4 text-uppercase"
        onClick={suivant}
      >
        <img
          className="logo"
          src={logoRepereSuivant}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </button>
      <input
        type="checkbox"
        className="btn-check"
        id="click"
        autoComplete="off"
        onChange={switchClick}
      />
      <label
        className="btn btn-outline-secondary btn-lg fw-bold fs-4 text-uppercase"
        htmlFor="click"
      >
        <img
          className="logo"
          src={logoClick}
          alt="Logo"
          style={{ width: "30px", height: "30px", marginRight: "10px" }}
        />
      </label>
    </div>
  );
}
export default Transport;
