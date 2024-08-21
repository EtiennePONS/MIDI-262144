import "./PageHome.css";

function PageHome() {
  return (
    <div className="body">
      <div className="container">
        <h1>Bienvenue sur MIDI-262144</h1>
        <p>
          Transformez votre tablette en un puissant outil de gestion visuelle.
          Que vous soyez <span className="highlight">Musicien</span>,{" "}
          <span className="highlight">Performeur</span> ou{" "}
          <span className="highlight">Technicien du spectacle</span>, notre
          application vous permet d’afficher des PDF ou vidéos, en réponse à des
          signaux numériques MIDI reçus via Bluetooth.
        </p>
        <p>
          Configuration et utilisation via votre compte Google Firebase. Débutez
          dès maintenant et découvrez comment MIDI-262144 peut transformer vos
          performances visuelles et musicales.
        </p>
      </div>
      {/* <div className="container">
        <img className="imageHome" src={imagePad} alt="LOGO" />
      </div> */}
    </div>
  );
}
export default PageHome;
