import md5 from "md5";
import axios from "axios";

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const ts = new Date().toISOString();
export const Hash = () => {
  const hashData = {
    hash: md5(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`),
    ts: ts,
  };
  return hashData;
};

const hashCode = Hash();

const api = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/characters?limit=52&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`,
});
export default api;

export const getComics = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/comics?limit=50&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`,
});

export const getStories = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/stories?limit=50&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`,
});

export const getSeries = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/series?limit=50&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`,
});
