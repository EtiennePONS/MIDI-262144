import "./App.css";
import { useEffect, useState } from "react";
import { database, storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
let chanson;

function App() {
  const [messageFromNavigator, setMessageFromNavigator] = useState("");
  const [chansonAAfficher, setChansonAAfficher] = useState([]);
  const [imageAAfficher, setImageAAfficher] = useState(
    "https://firebasestorage.googleapis.com/v0/b/midi-app-musicnotes.appspot.com/o/default.jpg?alt=media&token=3e002af3-0594-4765-bc1c-fca35caa6c19"
  );
  let midiAccess = null;

  useEffect(() => {
    setup();
  }, []);

  function reset() {
    setChansonAAfficher([]);
    setImageAAfficher("");
  }

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
                // chanson = programme;
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
                    setChansonAAfficher(morceau.data());
                    chanson = morceau.data().titre;
                  } else {
                    console.log("Pas de chanson, sur cette reference...");
                  }
                };
                getChanson();
              }
            } else if (data.length === 3) {
              // console.log(data);
              let command = data[0] >>> 4; // command est le quatrieme bit du premier octet "data".
              let channel = (data[0] & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).

              if (command === 0x9) {
                let note = data[1] + 1; // j'ajoute 1 à deuxiemeOctet pour me situer entre (1-128) au lieu de (0-127).
                console.log(
                  `Canal MIDI: ${channel}, Chanson: ${chanson}  , Note MIDI: ${note}`
                );
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
                  `${chanson}/${chanson}${note}.jpg`
                );

                async function downloadAndSetImage() {
                  try {
                    const url = await getDownloadURL(imageRef);
                    setImageAAfficher(url);
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
        <div>
          <h1>{messageFromNavigator}</h1>
          <button onClick={reset}>RESET</button>
          <h6 className="h6">Titre: {chansonAAfficher.titre}</h6>
          <h6 className="h6">Artiste: {chansonAAfficher.artiste}</h6>
          <h6 className="h6">
            Ch: {chansonAAfficher.canalMidi} Pgm: {chansonAAfficher.programMidi}
          </h6>
        </div>
        <img
          className="vignette"
          alt="vignette"
          src={chansonAAfficher.vignette}
        />
        <img className="prompteur" alt="Prompteur" src={imageAAfficher} />
      </header>
    </div>
  );
}

export default App;
