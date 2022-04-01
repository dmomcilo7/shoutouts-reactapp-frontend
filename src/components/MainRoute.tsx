import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import Card from "./Card";
import "./MainRoute.css";
import ShoutoutForm from "./ShoutoutForm";

const MainRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const getAndSetShoutouts = () => {
    getShoutouts({}).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts();
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts();
    });
  };

  useEffect(() => {
    getAndSetShoutouts();
  }, []);

  return (
    <div className="MainRoute">
      <h2>All Shoutouts</h2>
      {user ? (
        <ShoutoutForm onAddShoutout={addShoutoutHandler} name="" />
      ) : (
        <div>
          <p>Sign in to leave a shoutout</p>
          <button onClick={signInWithGoogle}>Sign in</button>
        </div>
      )}

      <ul>
        {shoutouts.map((shoutout) => (
          <Card
            key={shoutout._id}
            shoutout={shoutout}
            onDeleteShoutout={deleteShoutoutHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default MainRoute;
