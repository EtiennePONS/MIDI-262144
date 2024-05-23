import "./Chanson.css";
function Chanson({ chanson }) {
  console.log(chanson);
  const handleModifyChanson = () => {
    console.log("handleModifyChanson");
  };
  const handleDeleteChanson = () => {
    console.log("handleDeleteChanson");
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
            className="btn btn-primary"
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
