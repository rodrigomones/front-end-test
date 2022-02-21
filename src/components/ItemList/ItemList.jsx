import { Grid, IconButton, Box } from "@mui/material";
import Item from "../Card/Item";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProgressBar from "../ProgressBar/ProgressBar";
import imgNotFound from "../../assets/notFound.jpeg";

export const ItemList = ({
  response,
  handleFavoritesClick,
  addFavoriteList,
}) => {
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {response ? (
        response.map((element, index) => {
          return (
            <Grid
              item
              xs={4}
              sm={4}
              md={3}
              key={index}
              justifyContent="center"
              alignItems="center"
            >
              <Item
                id={element.id}
                name={element.name}
                title={element.title}
                description={element.description}
                url={!element.type ? element.urls[0].url : imgNotFound}
                thumbnail={
                  !element.type
                    ? element.thumbnail.path + "." + element.thumbnail.extension
                    : imgNotFound
                }
              />
              <Box
                sx={{ maxWidth: 300 }}
                style={{
                  backgroundColor: "black",
                  borderRadius: "0 0 4px 4px",
                }}
              >
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFavoritesClick(element)}
                >
                  <FavoriteIcon
                    style={{
                      color: addFavoriteList.includes(element) ? "red" : "grey",
                      marginLeft: 8,
                    }}
                  />
                </IconButton>
              </Box>
            </Grid>
          );
        })
      ) : (
        <ProgressBar />
      )}
    </Grid>
  );
};
