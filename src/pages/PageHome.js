import "./PageHome.css";
function PageHome() {
  return (
    <div className="body">
      <div class="container">
        <h1>Bienvenue sur MIDI-20480</h1>
        <p>
          Transformez votre tablette en un puissant outil de gestion visuelle.
          Que vous soyez <span class="highlight">Musicien</span>,{" "}
          <span class="highlight">Performeur</span> ou{" "}
          <span class="highlight">Technicien du spectacle</span>, notre
          application vous permet d’afficher des PDF ou vidéos, en réponse à des
          signaux numériques MIDI reçus via Bluetooth.
        </p>
        <p>
          Configuration et utilisation via votre compte Google Firebase. Débutez
          dès maintenant et découvrez comment MIDI-20480 peut transformer vos
          performances visuelles et musicales.
        </p>
      </div>
    </div>
  );
}
export default PageHome;
