import axios from "axios";
import QueryStringParams from "../models/QueryStringParams";
import Shoutout from "../models/Shoutout";

const baseURL: string = process.env.REACT_APP_API_URL || "";

export const getShoutouts = async (
  params: QueryStringParams
): Promise<Shoutout[]> => {
  return (await axios.get(baseURL, { params })).data;
};

export const addShoutout = async (newShoutout: Shoutout): Promise<Shoutout> => {
  return (await axios.post(baseURL, newShoutout)).data;
};

export const deleteShoutout = async (id: string): Promise<void> => {
  return (await axios.delete(`${baseURL}/${encodeURIComponent(id)}`)).data;
};
