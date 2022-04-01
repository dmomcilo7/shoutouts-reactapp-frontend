import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QueryStringParams from "../models/QueryStringParams";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import Card from "./Card";
import ShoutoutForm from "./ShoutoutForm";
import "./ShoutoutsByNameRoute.css";

const ToRoute = () => {
  const name: string | undefined = useParams().name;

  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  //can make another function cuz repeating lines 18 and 19.

  const getAndSetShoutouts = (params: QueryStringParams) => {
    getShoutouts(params).then((response) => {
      setShoutouts(response);
    });
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h2>Shoutouts by {name}</h2>
      <Link to="/">Back to All Shoutouts</Link>
      <ShoutoutForm onAddShoutout={addShoutoutHandler} name={name!} />
      <ul>
        {shoutouts.map((shoutout) => {
          return (
            <Card
              shoutout={shoutout}
              key={shoutout._id}
              onDeleteShoutout={deleteShoutoutHandler}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ToRoute;
