import { FC, useCallback, useEffect, useState } from "react";
import {
  RouteProps,
  useLocation,
} from "react-router-dom";
import { Ability, Move, PokiMonDetails } from "../../types/interface";

type Props = {} & RouteProps;
const PokemonDetailsPage: FC<Props> = (props: Props) => {
  const { state: url } = useLocation();
  const [pokemonDetails, setPokemonDetails] = useState<PokiMonDetails>();

  const fetchPokemonDetails = useCallback(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data: PokiMonDetails) => setPokemonDetails(data))
      .catch((error) => console.log(error));
  }, [url]);

  useEffect(() => {
    fetchPokemonDetails();
  }, [fetchPokemonDetails]);

  const getAbilityString = (ability: Ability[]): string => {
    return ability?.map((ability) => ability?.ability?.name).join(",");
  };

  const getMoveString = (moves: Move[]): string => {
    return moves?.map((move) => move?.move?.name).join(",");
  };
  if (pokemonDetails) {
    return (
      <>
        <div>
          <span>Name:</span>
          <span>{pokemonDetails?.name}</span>
        </div>
        <br></br>
        <div>
          <span>Height:</span>
          <span>{pokemonDetails?.height}</span>
        </div>
        <div>
          <span>Moves:</span>
          <span>{getMoveString(pokemonDetails.moves)}</span>
        </div>
        <br></br>
        <div>
          <span>Ability:</span>
          <span>{getAbilityString(pokemonDetails.abilities)}</span>
        </div>
        <br></br>
        <div>
          <span>Species:</span>
          <span>{pokemonDetails?.species?.name}</span>
        </div>
      </>
    );
  }

  return <></>;
};

export default PokemonDetailsPage;
