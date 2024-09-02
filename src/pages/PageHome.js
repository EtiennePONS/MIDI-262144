import "./PageHome.css";
import imageMidi from "../logo/favicon.ico";
import imageBluetooth from "../logo/bluetooth.png";
import imageWifi from "../logo/wifi.png";

function PageHome() {
  return (
    <div className="body">
      <div className="container">
        <h1>Bienvenue sur MIDI-262144</h1>
        <p>
          Transformez votre tablette en un puissant outil de gestion visuelle.
          Que vous soyez <span className="highlight">Musicien, </span>
          <span className="highlight">Performeur</span> ou{" "}
          <span className="highlight">Technicien du spectacle</span>, notre
          application vous permet d’afficher des PDF ou vidéos, en réponse à des
          signaux numériques MIDI reçus via Bluetooth.
        </p>
        <p>
          Configuration et utilisation via votre compte Google Firebase.
          Affichage de vos données via Wifi.
        </p>
        <p>
          Pilotez votre logiciel "DAW" et votre projet, grâce à la barre de
          transport integrée.
        </p>
        <p>
          Débutez dès maintenant et découvrez comment MIDI-262144 peut
          transformer vos performances visuelles et musicales.
        </p>
        <div>
          <img
            src={imageMidi}
            alt="LOGO"
            width="51"
            height="51"
            className="d-inline-block align-text-top midi"
          />
          <img
            src={imageBluetooth}
            alt="LOGO"
            className="d-inline-block align-text-top bluetooth"
            width="50"
            height="50"
          />
          <img
            src={imageWifi}
            alt="LOGO"
            className="d-inline wifi align-text-top"
            width="50"
            height="50"
          />
        </div>
      </div>
      {/* <div className="container">
        <img className="imageHome" src={imagePad} alt="LOGO" />
      </div> */}
    </div>
  );
}
export default PageHome;
