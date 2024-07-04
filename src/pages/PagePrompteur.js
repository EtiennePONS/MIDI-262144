import "./PagePrompteur.css";
import { useEffect, useState, useRef } from "react";
import { database, storage } from "../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import ProgressBar from "../components/ProgressBar";
let titreChanson;

function PagePrompteur({
  modifyParentStateValue,
  modifyParentStateImage,
  theGivenSong,
  theGivenImage,
}) {
  const videoRef = useRef(null);
  const [messageFromNavigator, setMessageFromNavigator] = useState("");

  let midiAccess = null;

  useEffect(() => {
    setup();
  }, []);

  function setup() {
    if (window.navigator.requestMIDIAccess) {
      window.navigator.requestMIDIAccess({ sysex: false }).then(success);
    } else {
      setMessageFromNavigator(
        "Connection IMPOSSIBLE: Ce navigateur n'est pas en capacité de recevoir et d'envoyer des signaux numériques MIDI... 🙄"
      );
    }

    function setupEventHandler() {
      let inputs = [];
      let iter = midiAccess.inputs.values();

      for (let o = iter.next(); !o.done; o = iter.next()) {
        inputs.push(o.value);
      }

      for (let port = 0; port < inputs.length; port++) {
        inputs[port].onmidimessage = function (event) {};
        inputs[port].onstatechange = function (event) {};
      }
    }

    function success(access) {
      // setMessageFromNavigator(
      //   "SUPER!!! Ce navigateur est en capacité de recevoir et d'envoyer des signaux numériques MIDI... 😊"
      // );

      midiAccess = access;
      midiAccess.onstatechange = function (event) {
        if (event.port.type === "input") {
          event.port.onmidimessage = function (event) {
            const data = event.data;
            if (data.length === 2) {
              let command = data[0] >>> 4; // command est le quatrieme bit du premier octet "data".
              let channel = (data[0] & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).
              let programme = data[1] + 1;
              if (command === 0xc) {
                // console.log(
                //   `Canal MIDI: ${channel}, Programme MIDI: ${programme}`
                // );
                const chansonRef = doc(
                  database,
                  "chansons",
                  `${channel}-${programme}`
                );

                const getChanson = async () => {
                  const morceau = await getDoc(chansonRef);
                  if (morceau.exists()) {
                    titreChanson = morceau.data().titre;
                    modifyParentStateValue(morceau.data());
                    downloadAndSetImage();
                    // alert(morceau.data().video);
                    updateVideo(morceau.data().video);
                  } else {
                    console.log("Pas de chanson, sur cette reference...");
                  }
                };
                async function downloadAndSetImage() {
                  const imageRef = ref(
                    storage,
                    `canal-${channel}/${titreChanson}/${titreChanson}.pdf`
                  );
                  try {
                    const url = await getDownloadURL(imageRef);
                    modifyParentStateImage(url);
                  } catch (error) {
                    console.error(
                      "Une erreur s'est produite lors du téléchargement de l'image :",
                      error
                    );
                  }
                }
                // downloadAndSetImage();
                getChanson();
              }
            }
          };
        }
      };

      setupEventHandler();
    }
  }
  function updateVideo(lienvideo) {
    let video = document.getElementById("myVideo");
    let source = document.getElementById("mySource");
    video.pause();
    source.setAttribute("src", lienvideo);
    video.load();
    video.play();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="cartouche">
          <dl className="row">
            {/* <dt className="h6 col-sm-3">Titre:</dt>
            <dd class="h6 col-sm-9">{chansonAAfficher.titre}</dd> */}
            <dt className="h6 col-sm-3">Artiste:</dt>
            <dd className="h6 col-sm-9">{theGivenSong.artiste}</dd>
            <dt className="h6 col-sm-3">Date:</dt>
            <dd className="h6 col-sm-9">{theGivenSong.dateDeSortie}</dd>
            <dt className="h6 col-sm-3">Ch(1-16):</dt>
            <dd className="h6 col-sm-9">{theGivenSong.canalMidi}</dd>
            <dt className="h6 col-sm-3">Pgm(1-128):</dt>
            <dd className="h6 col-sm-9">{theGivenSong.programMidi}</dd>
          </dl>
          {/* <h1>{messageFromNavigator}</h1>
          <button onClick={reset}>RESET</button> */}
        </div>
        <img className="vignette" alt="" src={theGivenSong.vignette} />
        <video
          className="video"
          autoplay="autoplay"
          muted="muted"
          id="myVideo"
          ref={videoRef}
        >
          <source
            id="mySource"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            title="480p"
            type="video/mp4"
          ></source>
        </video>
        <ProgressBar className="ProgressBar" reference={videoRef}></ProgressBar>
      </header>
    </div>
  );
}

export default PagePrompteur;
