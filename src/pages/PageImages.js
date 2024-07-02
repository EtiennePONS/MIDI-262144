import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase-config";
import { useEffect, useState } from "react";
import { storage } from "../firebase-config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function PageImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const chansonsCollectionRef = collection(database, "chansons");
  const [chansonSelected, setChansonSelected] = useState("");
  const [chansons, setChansons] = useState([]);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "canal-1/Charlie Brown/");

  const getImages = async () => {
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };

  const getChansons = async () => {
    const data = await getDocs(chansonsCollectionRef);

    setChansons(data.docs.map((doc) => ({ ...doc.data(), id: doc.titre })));
  };

  const uploadPDF = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${chansonSelected}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Uploaded 😉");
    });
  };

  useEffect(() => {
    getImages();
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
                <label htmlFor="inputChansonForImage" className="form-label">
                  Choisissez la chanson à configurer
                </label>
                <select
                  name="chanson"
                  className="form-select"
                  aria-label="Floating label select example"
                  defaultValue=""
                  id="inputChansonForImage"
                  onChange={(event) => {
                    setChansonSelected(event.target.value);
                  }}
                >
                  <option value="Liste de chansons"></option>
                  {chansons.map((chanson) => {
                    return (
                      <option key={chanson.titre}>
                        canal-{chanson.canalMidi}/{chanson.titre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputFilesForImage" className="form-label">
                  Importez vos fichier pdf, exemple: "Charlie Brown-C0.pdf"
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="inputFilesForImage"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
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
                type="button"
                className="btn btn-primary"
                onClick={uploadPDF}
                data-bs-dismiss="modal"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
      {imageList.map((url) => {
        return (
          <div class="card bg-dark text-white">
            <img src={url} class="card-img" alt="pdf" />
            <div class="card-img-overlay">
              <h5 class="card-title">{}</h5>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">Last updated 3 mins ago</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default PageImage;
