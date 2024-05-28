import "./App.css";
import Home from "./pages/PageHome";
import Play from "./pages/PagePlay";
import Chansons from "./pages/PageChansons";
import Images from "./pages/PageImages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [chansonTitre, setChansonTitre] = useState("");
  // console.log(chansonTitre);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar theGivenTitle={chansonTitre} />
        <Routes>
          <Route path="MIDI-262144/" element={<Home />} />
          <Route
            path="/MIDI-262144/Play"
            element={<Play modifyParentStateValue={setChansonTitre} />}
          />
          <Route path="MIDI-262144/Medias" element={<Chansons />} />
          <Route path="MIDI-262144/Galerie" element={<Images />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
