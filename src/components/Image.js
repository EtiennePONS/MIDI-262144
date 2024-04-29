import "./Image.css";
function Image() {
  const handleModifyImage = () => {};
  const handleDeleteImage = () => {};
  return (
    <div className="image">
      <div className="card">
        <h5 className="card-header">Featured</h5>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button
            className="btn btn-success"
            onClick={() => handleModifyImage()}
          >
            Go Modifier
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteImage()}
          >
            Go Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
export default Image;
