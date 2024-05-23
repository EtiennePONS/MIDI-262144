import { useEffect, useState } from "react";
import Chanson from "../components/Chanson";
import "./PageChansons.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { database } from "../firebase-config";
function PageChansons() {
  const [chansons, setChansons] = useState([]);

  useEffect(() => {
    const q = query(collection(database, "chansons"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chansonsArray = [];

      querySnapshot.forEach((doc) => {
        chansonsArray.push({
          ...doc.data(),
          id: doc.titre,
        });
      });
      setChansons(chansonsArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="body">
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Créer une nouvelle chanson
      </button>
      <div>
        {chansons.map((chanson) => (
          <Chanson key={chanson.titre} chanson={chanson} />
        ))}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
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
export default PageChansons;
