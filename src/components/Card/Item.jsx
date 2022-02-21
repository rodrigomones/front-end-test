import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Item = ({ id, name, title, thumbnail, isActive }) => {
  return (
    <Card
      key={id}
      sx={{ maxWidth: 300 }}
      style={{
        backgroundColor: "black",
        borderRadius: "4px 4px 0 0",
        maxHeight: 330,
      }}
    >
      <CardActionArea component={Link} to={"/character/" + id}>
        <CardMedia
          component="img"
          height="250"
          image={thumbnail}
          alt={name}
          style={{ borderBottom: "solid 4px red" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component={"span"} color="#FFF">
            {name} {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <FavoriteIcon style={{ color: isActive }} />
    </Card>
  );
};

export default React.memo(Item);
