import "./PagePlay.css";
import { useEffect, useState } from "react";
import { database, storage } from "../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
let titreChanson;

function PagePlay({
  modifyParentStateValue,
  modifyParentStateImage,
  theGivenSong,
  theGivenImage,
}) {
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
            } else if (data.length === 3) {
              // console.log(data);
              let command = data[0] >>> 4; // command est le quatrieme bit du premier octet "data".
              let channel = (data[0] & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).

              if (command === 0x9) {
                let note = data[1] + 1; // j'ajoute 1 à deuxiemeOctet pour me situer entre (1-128) au lieu de (0-127).
                // console.log(
                //   `Canal MIDI: ${channel}, Chanson: ${titreChanson}  , Note MIDI: ${note}`
                // );
                switch (note) {
                  case 25:
                    note = "C0";
                    break;
                  case 37:
                    note = "C1";
                    break;
                  case 49:
                    note = "C2";
                    break;
                  case 61:
                    note = "C3";
                    break;
                  case 73:
                    note = "C4";
                    break;
                  case 85:
                    note = "C5";
                    break;
                  case 97:
                    note = "C6";
                    break;
                  case 109:
                    note = "C7";
                    break;
                  case 121:
                    note = "C8";
                    break;

                  default:
                    console.log(`Sorry, we are out of.`);
                }
                const imageRef = ref(
                  storage,
                  `canal-${channel}/${titreChanson}/${titreChanson}-${note}.pdf`
                );

                async function downloadAndSetImage() {
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

                downloadAndSetImage();
              }
            }
          };
        }
      };

      setupEventHandler();
    }
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
            <dd className="h6 col-sm-9"> {theGivenSong.programMidi}</dd>
          </dl>
          {/* <h1>{messageFromNavigator}</h1>
          <button onClick={reset}>RESET</button> */}
        </div>
        <img className="vignette" alt="" src={theGivenSong.vignette} />

        <object className="pdf" title="app/pdf" data={theGivenImage}></object>
      </header>
    </div>
  );
}

export default PagePlay;
