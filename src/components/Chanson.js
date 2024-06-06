import "./Chanson.css";
import React from "react";
function Chanson({
  chanson,
  handleDeleteChanson,
  setNewArtiste,
  setNewProgramMidi,
  handleModifyChanson,
  setNewCanalMidi,
  setNewVignette,
  setNewDateDeSortie,
  setNewTitre,
}) {
  return (
    <div className="chanson">
      <div className="card">
        <h5 className="card-header">{chanson.titre}</h5>
        <div className="card-body">
          <p className="card-text">
            Ch.{chanson.canalMidi} / Pgm{chanson.programMidi}
          </p>
          {/* <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#ModificationChansonModal"
          >
            Edit
          </button>
          <div
            className="modal fade"
            id="ModificationChansonModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ModificationChansonModal">
                    Modification "{chanson.titre}"...
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Artiste...
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewArtiste(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Titre...
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewTitre(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Date de sortie...
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewDateDeSortie(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Vignette...
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewVignette(event.target.value);
                      }}
                    />
                  </div>
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Canal-Midi...
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="16"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewCanalMidi(event.target.value);
                      }}
                    />
                  </div>{" "}
                  <div className="input-group input-group-sm mb-3">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Programme-Midi...
                    </span>
                    <input
                      type="number"
                      min="1"
                      max="128"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(event) => {
                        setNewProgramMidi(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleModifyChanson(chanson.id);
                    }}
                    type="button"
                    className="btn btn-warning"
                    data-bs-dismiss="modal"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#suppressionChansonModal"
          >
            Supprimer
          </button>
          <div
            className="modal fade"
            id="suppressionChansonModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="suppressionChansonModal">
                    Suppression...
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Attention: vous êtes sur le point de supprimer la chanson "
                  Ch.{chanson.canalMidi} / Pgm{chanson.programMidi}"
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleDeleteChanson(chanson.programMidi);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chanson;
