import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from "@mui/material";
import { Pokimon, PokimonApiResonse } from "../../types/interface";
import InfoIcon from "@mui/icons-material/Info";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PokimonList: React.FC = () => {
  const [pokimons, setPokimons] = useState<Pokimon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const navigate = useNavigate();

  const onScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    console.log({ scrollHeight, clientHeight, scrollTop });
    if (scrollTop + clientHeight >= scrollHeight) {
      fetchPokimons();
    }
  };

  const fetchPokimons = useCallback(() => {
    nextUrl &&
      fetch(nextUrl)
        .then((resp) => resp.json())
        .then((data: PokimonApiResonse) => {
          setNextUrl(data.next);
          setPokimons((val) => [...val, ...data.results]);
        })
        .catch((err) => console.log(err));
  }, [nextUrl]);

  const navigateToDetails = (url: string) => {
    navigate(`/pokimon`, {
      state: url,
    });
  };

  useEffect(() => {
    fetchPokimons();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div>
      <Paper variant="outlined">
        <ImageList cols={4}>
          {pokimons.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                srcSet={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={item.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.name}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.name}`}
                    onClick={() => navigateToDetails(item.url)}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </div>
  );
};

export default PokimonList;
