import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../../context/context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 30,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default function SearchBar() {
  const { comicsList, setResponse, charactersList, storiesList, seriesList } =
    useContext(CharacterContext);
  const [searchInput, setSearchInput] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [isActive, setIsActive] = useState([
    "selected",
    "unSelected",
    "unSelected",
    "unSelected",
  ]);

  const handleInput = (e) => {
    const text = e.target.value;
    setSearchInput(text);
  };

  useEffect(() => {
    if (searchInput === "") {
      setResponse(charactersList);
    } else if (searchInput && filterBy === "name") {
      const result = charactersList.filter((element) =>
        element.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResponse(result);
    } else if (searchInput && filterBy === "comics") {
      const result = comicsList.filter((element) =>
        element.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResponse(result);
    } else if (searchInput && filterBy === "stories") {
      const result = storiesList.filter((element) =>
        element.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResponse(result);
    } else if (searchInput && filterBy === "series") {
      const result = seriesList.filter((element) =>
        element.title.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResponse(result);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charactersList, searchInput]);

  const filter = ["name", "comics", "stories", "series"];
  useEffect(() => {
    let filterColorsButton = [];
    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === filterBy) {
        filterColorsButton = [...filterColorsButton, "selected"];
      } else {
        filterColorsButton = [...filterColorsButton, "unSelected"];
      }
    }
    setIsActive(filterColorsButton);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy]);

  // const onSearch = () => {};
  // const handleKey = (e) => {
  //   if (e.key === "Enter") {
  //     onSearch(searchInput);
  //   }
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={5}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  inputProps={{ "aria-label": "search" }}
                  placeholder={`Search by ${filterBy}...`}
                  className="inputSearch"
                  value={searchInput}
                  onChange={handleInput}
                  //onKeyPress={handleKey}
                />
              </Search>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" display="block" noWrap>
                  Search By:
                </Typography>
                <Typography
                  className={isActive[0]}
                  variant="overline"
                  display="block"
                  onClick={() => setFilterBy("name")}
                >
                  Name
                </Typography>
                <Typography
                  className={isActive[1]}
                  variant="overline"
                  display="block"
                  onClick={() => setFilterBy("comics")}
                >
                  Comics
                </Typography>
                <Typography
                  className={isActive[2]}
                  variant="overline"
                  display="block"
                  onClick={() => setFilterBy("stories")}
                >
                  Stories
                </Typography>
                <Typography
                  className={isActive[3]}
                  variant="overline"
                  display="block"
                  onClick={() => setFilterBy("series")}
                >
                  Series
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
