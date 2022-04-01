import { Link } from "react-router-dom";

import Shoutout from "../models/Shoutout";
import "./Card.css";

interface Props {
  shoutout: Shoutout;
  onDeleteShoutout: (id: string) => void;
}

const Card = ({ shoutout, onDeleteShoutout }: Props) => {
  return (
    <li className="Card">
      <Link to={`/user/${shoutout.to}`}>
        <h2>{`Shout out to ${shoutout.to}`}</h2>
      </Link>
      <p>
        - from <img src={shoutout.avatar} alt="avatar" />
        {shoutout.from}
      </p>
      <p>{shoutout.text}</p>
      <img src={shoutout.image} alt="shoutout" />
      <button onClick={() => onDeleteShoutout(shoutout._id!)}>X</button>
    </li>
  );
};

export default Card;
