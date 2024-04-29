import "./Chanson.css";
function Chanson({ chanson, handleModifyChanson, handleDeleteChanson }) {
  console.log(chanson);
  return (
    <div className="chanson">
      <div className="card">
        <h5 className="card-header">{chanson.titre}</h5>
        <div className="card-body">
          <p className="card-text">
            Ch.{chanson.canalMidi} Pgm{chanson.programMidi}
          </p>
          <button
            className="btn btn-success"
            onClick={() => handleModifyChanson()}
          >
            Modifier
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteChanson()}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
export default Chanson;
