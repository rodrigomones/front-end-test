import axios from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import api, { getComics, getSeries, getStories, Hash } from "../utils";
import ProgressBar from "../components/ProgressBar/ProgressBar";

export const CharacterContext = createContext();

const { Provider } = CharacterContext;

export const CharacterProvider = ({ children }) => {
  const [charactersList, setCharactersList] = useState([]);
  const [comicsList, setComicsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState([]);
  const [storiesList, setStoriesList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const componentMounted = useRef(true);
  const [favorite, setFavorite] = useState([]);
  const [comicsListById, setComicsListById] = useState([]);
  const [storiesListById, setStoriesListById] = useState([]);
  const [seriesListById, setSeriesListById] = useState([]);

  useEffect(() => {
    const localInfo = localStorage.getItem("favorites");
    if (!localInfo) localStorage.setItem("favorites", JSON.stringify([]));
    else setFavorite(JSON.parse(localInfo));
    const fetchItems = async () => {
      try {
        const response = await api.get("");
        setLoading(false);
        setCharactersList(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
      return () => {
        componentMounted.current = false;
      };
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getComics.get("");
        setLoading(false);
        setComicsList(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
      return () => {
        componentMounted.current = false;
      };
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getStories.get("");
        setLoading(false);
        setStoriesList(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getSeries.get("");
        setLoading(false);
        setSeriesList(response.data.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  let hashCode = Hash();
  const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

  const getComicsById = async (id) => {
    try {
      const allComics = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?format=comic&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`
      );
      setComicsListById(allComics.data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getStoriesById = async (id) => {
    try {
      const allStories = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/stories?&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`
      );
      setStoriesListById(allStories.data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeriesById = async (id) => {
    try {
      const allSeries = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/series?&ts=${hashCode.ts}&apikey=${PUBLIC_KEY}&hash=${hashCode.hash}`
      );
      setSeriesListById(allSeries.data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <Provider
      value={{
        charactersList,
        comicsList,
        setResponse,
        response,
        storiesList,
        seriesList,
        favorite,
        setFavorite,
        comicsListById,
        getComicsById,
        getStoriesById,
        storiesListById,
        getSeriesById,
        seriesListById,
      }}
    >
      {" "}
      {loading ? <ProgressBar /> : children}{" "}
    </Provider>
  );
};
