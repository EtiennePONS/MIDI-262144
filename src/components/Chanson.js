import "./Chanson.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import React from "react";
function Chanson({ chanson, handleDeleteChanson }) {
  const submit = () => {
    confirmAlert({
      title: "Suppression",
      message: `Attention: Vous êtes sur le point de supprimer la chanson: "${chanson.titre}".`,
      buttons: [
        {
          className: "btn btn-danger",
          label: "Supprimer",
          onClick: () =>
            handleDeleteChanson(
              `${chanson.canalMidi}-${chanson.programMidi}`,
              chanson.titre
            ),
        },
        {
          className: "btn btn-warning",
          label: "Annuler",
        },
      ],
      closeOnClickOutside: false,
    });
  };
  return (
    <div className="chanson">
      <div className="card">
        <h5 className="card-header">{chanson.titre}</h5>
        <div className="card-body">
          <p className="card-text">
            Ch.{chanson.canalMidi} / Pgm{chanson.programMidi}
          </p>
          <button type="button" className="btn btn-danger" onClick={submit}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
export default Chanson;
