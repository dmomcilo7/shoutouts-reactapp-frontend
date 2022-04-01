import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Shoutout from "../models/Shoutout";
import { deleteShoutout, getShoutouts } from "../services/ShoutoutService";
import Card from "./Card";
import "./MeRoute.css";

const MeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const navigate = useNavigate();

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getShoutouts({ me: user?.displayName! }).then((response) => {
        // console.log(response);
        setShoutouts(response);
      });
    });
  };

  useEffect(() => {
    if (user) {
      getShoutouts({ me: user.displayName! }).then((response) => {
        // console.log(response);
        setShoutouts(response);
      });
    } else {
      navigate("/");
      //navigate back home
    }
  }, [user]);

  return (
    <div className="MeRoute">
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

export default MeRoute;
