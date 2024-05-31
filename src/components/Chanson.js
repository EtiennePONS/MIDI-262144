import "./Chanson.css";
function Chanson({ chanson, handleDeleteChanson }) {
  const id = `${chanson.canalMidi}-${chanson.programMidi}`;

  //console.log(chanson);
  const handleModifyChanson = () => {
    console.log("handleModifyChanson");
  };
  return (
    <div className="chanson">
      <div className="card">
        <h5 className="card-header">{chanson.titre}</h5>
        <div className="card-body">
          <p className="card-text">
            Ch.{chanson.canalMidi} / Pgm{chanson.programMidi}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleModifyChanson()}
          >
            Modifier
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDeleteChanson(id)}
            // data-bs-toggle="modal"
            // data-bs-target="#suppressionChansonModal"
          >
            Supprimer
          </button>
          {/* <div
            className="modal fade"
            id="suppressionChansonModal"
            tabIndex="-1"
            aria-labelledby="suppressionChansonModal"
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
                    onClick={() => handleDeleteChanson(id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Chanson;
