import { useEffect, useState } from "react";
import Chanson from "../components/Chanson";
import "./PageChansons.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { database } from "../firebase-config";
function PageChansons() {
  const [chansons, setChansons] = useState([]);

  useEffect(() => {
    const q = query(collection(database, "chansons"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let chansonsArray = [];

      querySnapshot.forEach((doc) => {
        chansonsArray.push({
          ...doc.data(),
          id: doc.titre,
        });
      });
      setChansons(chansonsArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="body">
      <div>
        {chansons.map((chanson) => (
          <Chanson key={chanson.titre} chanson={chanson} />
        ))}
      </div>
    </div>
  );
}
export default PageChansons;
