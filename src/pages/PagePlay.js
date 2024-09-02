import "./PagePlay.css";
import { useEffect, useState } from "react";
import { database, storage } from "../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import Transport from "../components/Transport";
let titreChanson;

function PagePlay({
  modifyParentStateValue,
  modifyParentStateImage,
  theGivenSong,
  theGivenImage,
}) {
  const messageFromNavigator = "";
  let midiAccess = null;
  const [midiOutput, setMidiOutput] = useState(null);

  useEffect(() => {
    setup();
  }, []);

  function setup() {
    if (window.navigator.requestMIDIAccess) {
      window.navigator.requestMIDIAccess({ sysex: false }).then(success);
    } else {
      messageFromNavigator(
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
      // console.log(
      //   "SUPER!!! Ce navigateur est en capacité de recevoir et d'envoyer des signaux numériques MIDI... 😊"
      // );
      // console.log(access);
      midiAccess = access;
      midiAccess.outputs.forEach((output) => {
        // console.log(output);
        setMidiOutput(output); // Enregistre la première sortie MIDI
      });
      midiAccess.onstatechange = function (event) {
        if (event.port.type === "input") {
          event.port.onmidimessage = function (event) {
            console.log(event.data);
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
            } else if (data.length === 3) {
              // console.log(data);
              let command = data[0] >>> 4; // command est le quatrieme bit du premier octet "data".
              let channel = (data[0] & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).

              if (command === 0x9) {
                let note = data[1] + 1; // j'ajoute 1 à deuxiemeOctet pour me situer entre (1-128) au lieu de (0-127).
                console.log(
                  `Canal MIDI: ${channel}, Chanson: ${titreChanson}  , Note MIDI: ${note}`
                );
                switch (note) {
                  case 1:
                    note = "C-2";
                    break;
                  case 2:
                    note = "C#-2";
                    break;
                  case 3:
                    note = "D-2";
                    break;
                  case 4:
                    note = "D#-2";
                    break;
                  case 5:
                    note = "E-2";
                    break;
                  case 6:
                    note = "F-2";
                    break;
                  case 7:
                    note = "F#-2";
                    break;
                  case 8:
                    note = "G-2";
                    break;
                  case 9:
                    note = "G#-2";
                    break;
                  case 10:
                    note = "A-2";
                    break;
                  case 11:
                    note = "A#-2";
                    break;
                  case 12:
                    note = "B-2";
                    break;
                  case 13:
                    note = "C-1";
                    break;
                  case 14:
                    note = "C#-1";
                    break;
                  case 15:
                    note = "D-1";
                    break;
                  case 16:
                    note = "D#-1";
                    break;
                  case 17:
                    note = "E-1";
                    break;
                  case 18:
                    note = "F-1";
                    break;
                  case 19:
                    note = "F#-1";
                    break;
                  case 20:
                    note = "G-1";
                    break;
                  case 21:
                    note = "G#-1";
                    break;
                  case 22:
                    note = "A-1";
                    break;
                  case 23:
                    note = "A#-1";
                    break;
                  case 24:
                    note = "B-1";
                    break;
                  case 25:
                    note = "C0";
                    break;
                  case 26:
                    note = "C#0";
                    break;
                  case 27:
                    note = "D0";
                    break;
                  case 28:
                    note = "D#0";
                    break;
                  case 29:
                    note = "E0";
                    break;
                  case 30:
                    note = "F0";
                    break;
                  case 31:
                    note = "F#0";
                    break;
                  case 32:
                    note = "G0";
                    break;
                  case 33:
                    note = "G#0";
                    break;
                  case 34:
                    note = "A0";
                    break;
                  case 35:
                    note = "A#0";
                    break;
                  case 36:
                    note = "B0";
                    break;
                  case 37:
                    note = "C1";
                    break;
                  case 38:
                    note = "C#1";
                    break;
                  case 39:
                    note = "D1";
                    break;
                  case 40:
                    note = "D#1";
                    break;
                  case 41:
                    note = "E1";
                    break;
                  case 42:
                    note = "F1";
                    break;
                  case 43:
                    note = "F#1";
                    break;
                  case 44:
                    note = "G1";
                    break;
                  case 45:
                    note = "G#1";
                    break;
                  case 46:
                    note = "A1";
                    break;
                  case 47:
                    note = "A#1";
                    break;
                  case 48:
                    note = "B1";
                    break;
                  case 49:
                    note = "C2";
                    break;
                  case 50:
                    note = "C#2";
                    break;
                  case 51:
                    note = "D2";
                    break;
                  case 52:
                    note = "D#2";
                    break;
                  case 53:
                    note = "E2";
                    break;
                  case 54:
                    note = "F2";
                    break;
                  case 55:
                    note = "F#2";
                    break;
                  case 56:
                    note = "G2";
                    break;
                  case 57:
                    note = "G#2";
                    break;
                  case 58:
                    note = "A2";
                    break;
                  case 59:
                    note = "A#2";
                    break;
                  case 60:
                    note = "B2";
                    break;
                  case 61:
                    note = "C3";
                    break;
                  case 62:
                    note = "C#3";
                    break;
                  case 63:
                    note = "D3";
                    break;
                  case 64:
                    note = "D#3";
                    break;
                  case 65:
                    note = "E3";
                    break;
                  case 66:
                    note = "F3";
                    break;
                  case 67:
                    note = "F#3";
                    break;
                  case 68:
                    note = "G3";
                    break;
                  case 69:
                    note = "G#3";
                    break;
                  case 70:
                    note = "A3";
                    break;
                  case 71:
                    note = "A#3";
                    break;
                  case 72:
                    note = "B3 ";
                    break;
                  case 73:
                    note = "C4";
                    break;
                  case 74:
                    note = "C#4";
                    break;
                  case 75:
                    note = "D4";
                    break;
                  case 76:
                    note = "D#4";
                    break;
                  case 77:
                    note = "E4";
                    break;
                  case 78:
                    note = "F4";
                    break;
                  case 79:
                    note = "F#4";
                    break;
                  case 80:
                    note = "G4";
                    break;
                  case 81:
                    note = "G#4";
                    break;
                  case 82:
                    note = "A4";
                    break;
                  case 83:
                    note = "A#4";
                    break;
                  case 84:
                    note = "B4";
                    break;
                  case 85:
                    note = "C5";
                    break;
                  case 86:
                    note = "C#5";
                    break;
                  case 87:
                    note = "D5";
                    break;
                  case 88:
                    note = "D#5";
                    break;
                  case 89:
                    note = "E5";
                    break;
                  case 90:
                    note = "F5";
                    break;
                  case 91:
                    note = "F#5";
                    break;
                  case 92:
                    note = "G5";
                    break;
                  case 93:
                    note = "G#5";
                    break;
                  case 94:
                    note = "A5";
                    break;
                  case 95:
                    note = "A#5";
                    break;
                  case 96:
                    note = "B5";
                    break;
                  case 97:
                    note = "C6";
                    break;
                  case 98:
                    note = "C#6";
                    break;
                  case 99:
                    note = "D6";
                    break;
                  case 100:
                    note = "D#6";
                    break;
                  case 101:
                    note = "E6";
                    break;
                  case 102:
                    note = "F6";
                    break;
                  case 103:
                    note = "F#6";
                    break;
                  case 104:
                    note = "G6";
                    break;
                  case 105:
                    note = "G#6";
                    break;
                  case 106:
                    note = "A6";
                    break;
                  case 107:
                    note = "A#6";
                    break;
                  case 108:
                    note = "B6";
                    break;
                  case 109:
                    note = "C7";
                    break;
                  case 110:
                    note = "C#7";
                    break;
                  case 111:
                    note = "D7";
                    break;
                  case 112:
                    note = "D#7";
                    break;
                  case 113:
                    note = "E7";
                    break;
                  case 114:
                    note = "F7";
                    break;
                  case 115:
                    note = "F#7";
                    break;
                  case 116:
                    note = "G7";
                    break;
                  case 117:
                    note = "G#7";
                    break;
                  case 118:
                    note = "A7";
                    break;
                  case 119:
                    note = "A#7";
                    break;
                  case 120:
                    note = "B7";
                    break;
                  case 121:
                    note = "C8";
                    break;
                  case 122:
                    note = "C#8";
                    break;
                  case 123:
                    note = "D8";
                    break;
                  case 124:
                    note = "D#8";
                    break;
                  case 125:
                    note = "E8";
                    break;
                  case 126:
                    note = "F8";
                    break;
                  case 127:
                    note = "F#8";
                    break;
                  case 128:
                    note = "G8";
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
  function updateVideo(lienvideo) {
    let source = document.getElementById("mySource");
    source.setAttribute("src", lienvideo);
  }
  const sendMIDIMessage = (message) => {
    if (midiOutput) {
      midiOutput.send(message);
      console.log(`MIDI message sent: ${message}`);
    } else {
      console.error("No MIDI output available.");
    }
  };
  const handleSendCC65On = () => {
    sendMIDIMessage([0xb0, 65, 127]); // 0xB0 = statut pour Control Change, 65 = numéro de contrôle, 127 = valeur maximale (fonction SUIVI Activée)
  };
  const handleSendCC65Off = () => {
    sendMIDIMessage([0xb0, 65, 0]); // 0xB0 = statut pour Control Change, 65 = numéro de contrôle, 0 = valeur minimale (fonction SUIVI Désactivée)
  };
  const handleSendCC116 = () => {
    sendMIDIMessage([0xb0, 116, 127]); // 0xB0 = statut pour Control Change, 116 = numéro de contrôle, 127 = valeur maximale (fonction PRECEDENT)
  };
  const handleSendCC117 = () => {
    sendMIDIMessage([0xb0, 117, 127]); // 0xB0 = statut pour Control Change, 117 = numéro de contrôle, 127 = valeur maximale (fonction STOP)
  };
  const handleSendCC118 = () => {
    sendMIDIMessage([0xb0, 118, 127]); // 0xB0 = statut pour Control Change, 118 = numéro de contrôle, 127 = valeur maximale (fonction PLAY)
  };
  const handleSendCC119 = () => {
    sendMIDIMessage([0xb0, 119, 127]); // 0xB0 = statut pour Control Change, 117 = numéro de contrôle, 127 = valeur maximale (fonction STOP)
  };
  const handleSendCC64On = () => {
    sendMIDIMessage([0xb0, 64, 127]); // 0xB0 = statut pour Control Change, 64 = numéro de contrôle, 127 = valeur maximale (fonction METRONOME Activée)
  };
  const handleSendCC64Off = () => {
    sendMIDIMessage([0xb0, 64, 0]); // 0xB0 = statut pour Control Change, 64 = numéro de contrôle, 0 = valeur minimale (fonction METRONOME Désactivée)
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="cartouche">
          <dl className="row">
            <dt className="h6 col-sm-3">Artiste:</dt>
            <dd className="h6 col-sm-9">{theGivenSong.artiste}</dd>
            <dt className="h6 col-sm-3">Date:</dt>
            <dd className="h6 col-sm-9">{theGivenSong.dateDeSortie}</dd>
            <dt className="h6 col-sm-3">Ch(1-16):</dt>
            <dd className="h6 col-sm-9">{theGivenSong.canalMidi}</dd>
            <dt className="h6 col-sm-3">Pgm(1-128):</dt>
            <dd className="h6 col-sm-9"> {theGivenSong.programMidi}</dd>
          </dl>
        </div>
        <img className="vignette" alt="" src={theGivenSong.vignette} />

        <object className="pdf" title="app/pdf" data={theGivenImage}></object>
      </header>
      <Transport
        suiviOn={handleSendCC65On}
        suiviOff={handleSendCC65Off}
        precedent={handleSendCC116}
        stop={handleSendCC117}
        play={handleSendCC118}
        suivant={handleSendCC119}
        clickOn={handleSendCC64On}
        clickOff={handleSendCC64Off}
      />
    </div>
  );
}

export default PagePlay;
