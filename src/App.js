import "./App.css";
import Home from "./pages/PageHome";
import Play from "./pages/PagePlay";
import Chansons from "./pages/PageChansons";
import Images from "./pages/PageImages";
import Prompteur from "./pages/PagePrompteur";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [chanson, setChanson] = useState([]);
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/midi-app-musicnotes.appspot.com/o/canal-1%2FTalk%2FTalk.pdf?alt=media&token=75367eb1-60d2-4986-981c-1ca4b36ff546"
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar theGivenTitle={chanson.titre} />
        <Routes>
          <Route path="MIDI-262144/" element={<Home />} />
          <Route
            path="/MIDI-262144/Play"
            element={
              <Play
                modifyParentStateImage={setImage}
                modifyParentStateValue={setChanson}
                theGivenSong={chanson}
                theGivenImage={image}
              />
            }
          />
          <Route path="MIDI-262144/Medias" element={<Chansons />} />
          <Route path="MIDI-262144/Galerie" element={<Images />} />
          <Route
            path="MIDI-262144/Prompteur"
            element={
              <Prompteur
                modifyParentStateImage={setImage}
                modifyParentStateValue={setChanson}
                theGivenSong={chanson}
                theGivenImage={image}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
