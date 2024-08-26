import "./App.css";
import Home from "./pages/PageHome";
import Play from "./pages/PagePlay";
import Prompteur from "./pages/PagePrompteur";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [chanson, setChanson] = useState([]);
  const [image, setImage] = useState(
    "https://firebasestorage.googleapis.com/v0/b/midi-app-musicnotes.appspot.com/o/default.pdf?alt=media&token=3e5988e8-2fff-40a8-90f8-4de788cce735"
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
          <Route
            path="MIDI-262144/Prompteur"
            element={
              <Prompteur
                modifyParentStateImage={setImage}
                modifyParentStateValue={setChanson}
                theGivenSong={chanson}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
