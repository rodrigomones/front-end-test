import { useState } from "react";
import { ItemList } from "../components/ItemList/ItemList";
import { useContext } from "react";
import { CharacterContext } from "../context/context";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import SearchBar from "../components/SearchBar/SearchBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ItemListContainer = () => {
  const [likeColor, setLikeColor] = useState("grey");
  const { response, favorite, setFavorite } = useContext(CharacterContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addToFavorite = (element) => {
    if (!favorite.includes(element)) {
      const newFavoriteList = [...favorite, element];
      setFavorite(newFavoriteList);
      setLikeColor("red");
    } else {
      removeFavorite(element);
    }
  };
  const removeFavorite = (element) => {
    const newFavoriteList = favorite.filter(
      (favorite) => favorite.id !== element.id
    );
    setFavorite(newFavoriteList);
    setLikeColor("grey");
  };

  return (
    <>
      <SearchBar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="My Favorites" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ItemList
            addFavoriteList={favorite}
            response={response}
            isActive={likeColor}
            handleFavoritesClick={addToFavorite}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ItemList
            addFavoriteList={favorite}
            response={favorite}
            handleFavoritesClick={removeFavorite}
          />
        </TabPanel>
      </Box>
    </>
  );
};
