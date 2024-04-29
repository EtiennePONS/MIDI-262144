import "./App.css";
import Home from "./pages/PageHome";
import Play from "./pages/PagePlay";
import Chansons from "./pages/PageChansons";
import Images from "./pages/PageImages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="MIDI-262144/" element={<Home />} />
          <Route path="MIDI-262144/Play" element={<Play />} />
          <Route path="MIDI-262144/Medias" element={<Chansons />} />
          <Route path="MIDI-262144/Galerie" element={<Images />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
