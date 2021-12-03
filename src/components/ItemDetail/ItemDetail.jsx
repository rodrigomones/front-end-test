import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { Suspense, useContext } from "react";
import { CharacterContext } from "../../context/context";
import NotFoundImg from "../../assets/no-img.jpg";
import Chip from "@mui/material/Chip";

export const ItemDetail = ({ character }) => {
  const { comicsListById, storiesListById, seriesListById } =
    useContext(CharacterContext);
  let img = character.thumbnail
    ? character.thumbnail.path + "." + character.thumbnail.extension
    : NotFoundImg;

  return (
    <>
      <Suspense fallback={<h1>Loading info...</h1>}>
        <Grid
          container
          spacing={2}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent="center"
        >
          <Grid item xs={4} sm={4} md={4}>
            <Box
              sx={{ p: 4 }}
              style={{
                // width: "50%",
                // height: "15rem",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                margin: "auto",
              }}
            >
              <img
                src={img}
                alt={character.name}
                style={{ flexShrink: 20, minWidth: "100%", minHeight: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={8}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                flexDirection: "column",
              }}
            >
              <Typography
                style={{ fontWeight: 700 }}
                component={"span"}
                gutterBottom
                variant="h3"
                sx={{ p: 4 }}
              >
                {character.name}
              </Typography>
              <div
                style={{
                  display: "flex",
                }}
              >
                <Divider orientation="vertical" flexItem>
                  <Chip label="DESCRIPTION" />
                </Divider>
                {/* <Typography
                  component={"span"}
                  gutterBottom
                  variant="h5"
                  sx={{ p: 4 }}
                >
                  Description
                </Typography> */}
                <Typography
                  sx={{ p: 4 }}
                  component={"span"}
                  variant="body1"
                  style={{ maxWidth: "40rem" }}
                >
                  {character.description}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ margin: "30px" }}>
          <Chip label="COMICS" />
        </Divider>

        <Grid container spacing={1} justifyContent="center">
          {comicsListById &&
            comicsListById.map((comic, index) => {
              return (
                <Grid item sx={{ p: 2 }}>
                  <Card sx={{ maxWidth: 160, maxHeight: 320 }} key={index}>
                    <CardMedia
                      component="img"
                      height="250"
                      image={
                        comic.thumbnail
                          ? comic.thumbnail.path +
                            "." +
                            comic.thumbnail.extension
                          : NotFoundImg
                      }
                      alt={comic.title}
                    />
                    <CardContent>
                      <Typography
                        component={"span"}
                        gutterBottom
                        variant="subtitle2"
                      >
                        {comic.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <div>
          <Divider style={{ margin: "30px" }}>
            <Chip label="SERIES" />
          </Divider>

          <Grid container spacing={1} justifyContent="center">
            {seriesListById &&
              seriesListById.map((series, index) => {
                return (
                  <Grid item sx={{ p: 2 }}>
                    <Card sx={{ maxWidth: 145 }} key={index}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={
                          series.thumbnail
                            ? series.thumbnail.path +
                              "." +
                              series.thumbnail.extension
                            : NotFoundImg
                        }
                        alt={series.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {series.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
        <div>
          <Divider style={{ margin: "30px" }}>
            <Chip label="STORIES" />
          </Divider>

          <Grid container spacing={1} justifyContent="center">
            {storiesListById &&
              storiesListById.map((stories, index) => {
                return (
                  <Grid item sx={{ p: 2 }}>
                    <Card sx={{ maxWidth: 145 }} key={index}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={
                          stories.thumbnail
                            ? stories.thumbnail.path +
                              "." +
                              stories.thumbnail.extension
                            : NotFoundImg
                        }
                        alt={stories.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="subtitle2"
                          component="div"
                        >
                          {stories.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </Suspense>
    </>
  );
};
