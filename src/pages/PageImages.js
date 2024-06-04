import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase-config";
import { useEffect, useState } from "react";

function PageImage() {
  const chansonsCollectionRef = collection(database, "chansons");

  const [chansons, setChansons] = useState([]);

  const getChansons = async () => {
    const data = await getDocs(chansonsCollectionRef);
    setChansons(data.docs.map((doc) => ({ ...doc.data(), id: doc.titre })));
  };
  useEffect(() => {
    getChansons();
  }, []);

  return (
    <div className="body">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Enregistrement d'un visuel
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enregistrement d'un visuel
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3"></div>
              <div className="mb-3">
                <select
                  name="chanson"
                  className="form-select"
                  aria-label="Floating label select example"
                  defaultValue=""
                  id="inputGroupSelect01"
                  // onChange={(e) => handleChansonSelectPourCreationVisuel(e)}
                >
                  <option value="Liste de chansons"></option>
                  {chansons.map((chanson) => {
                    return (
                      <option key={chanson.titre} value={chanson.titre}>
                        {chanson.titre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
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
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageImage;
