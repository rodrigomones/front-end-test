import { useContext, useEffect, useRef, useState } from "react";
import { ItemDetail } from "../components/ItemDetail/ItemDetail";
import { CharacterContext } from "../context/context";
import { useParams } from "react-router";
import ProgressBar from "../components/ProgressBar/ProgressBar";

export const ItemDetailContainer = () => {
  const { charactersList, getComicsById, getStoriesById, getSeriesById } =
    useContext(CharacterContext);
  const [character, setCharacter] = useState([]);
  const { id } = useParams();
  const componentMounted = useRef(true);

  useEffect(() => {
    if (id) {
      const result = charactersList.find(
        (element) => element.id.toString() === id
      );
      setCharacter(result);
    }
    return () => {
      componentMounted.current = false;
    };
  }, [charactersList, id]);

  let ID = character ? character.id : null;
  useEffect(() => {
    getComicsById(ID);
    getStoriesById(ID);
    getSeriesById(ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID]);

  console.log(ID);
  return (
    <>
      {character !== undefined ? (
        <div>
          <ItemDetail character={character} />
        </div>
      ) : (
        <ProgressBar />
      )}
    </>
  );
};
