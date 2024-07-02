import React from "react";
import { useEffect, useState } from "react";
import Chanson from "../components/Chanson";
import "./PageChansons.css";
import {
  setDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../firebase-config";
// import { toast } from "react-toastify";

function PageChansons() {
  const [chansons, setChansons] = useState([]);
  const [newArtiste, setNewArtiste] = useState("");
  const [newTitre, setNewTitre] = useState("");
  const [newDateDeSortie, setNewDateDeSortie] = useState("");
  const [newVignette, setNewVignette] = useState("");
  const [newCanalMidi, setNewCanalMidi] = useState(0);
  const [newProgramMidi, setNewProgramMidi] = useState(0);

  const chansonsCollectionRef = collection(database, "chansons");
  const getChansons = async () => {
    const data = await getDocs(chansonsCollectionRef);
    setChansons(data.docs.map((doc) => ({ ...doc.data(), id: doc.titre })));
  };
  const createChanson = async () => {
    await setDoc(
      doc(database, "chansons", `${newCanalMidi}-${newProgramMidi}`),
      {
        artiste: newArtiste,
        titre: newTitre,
        dateDeSortie: newDateDeSortie,
        vignette: newVignette,
        canalMidi: newCanalMidi,
        programMidi: newProgramMidi,
      }
    );
    getChansons();
  };

  const deleteChanson = async (id, titre) => {
    const chansonDoc = doc(database, "chansons", id);
    try {
      await deleteDoc(chansonDoc);
      getChansons();
      // Toast("acticle deleted successfully", { type: "success" });
    } catch (error) {
      console.log(error);
    }
    // const chansonDoc = doc(database, "chansons", id);
    // await deleteDoc(chansonDoc).then(() => {
    //   Toast(`la chanson "${titre}" a bien été supprimée... 😊 `);
    //   getChansons();
    // });
  };

  useEffect(() => {
    getChansons();
  }, []);
  return (
    <div className="body">
      <button
        type="button"
        className="btn btn-success creationChanson"
        data-bs-toggle="modal"
        data-bs-target="#creationChansonModal"
      >
        Créer une nouvelle chanson
      </button>
      <div
        className="modal fade"
        id="creationChansonModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="creationChansonModal">
                Créer une nouvelle Chanson.
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                <span className="input-group-text" id="inputGroup-sizing-sm">
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
                Annuler
              </button>
              <button
                onClick={createChanson}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="album">
        {chansons.map((chanson) => {
          return (
            <Chanson
              key={chanson.titre}
              chanson={chanson}
              handleDeleteChanson={deleteChanson}
            />
          );
        })}
      </div>
    </div>
  );
}
export default PageChansons;
