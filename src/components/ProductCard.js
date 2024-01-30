import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

// const sample = {
// "name":"Tan Leatherette Weekender Duffle",
// "category":"Fashion",
// "cost":150,
// "rating":4,
// "image":"https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
// "_id":"PmInA797xJhMIPti"
// }

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Grid xs={6} md={3} sx={{px:2,my:2}}>
    <Card className="card" key={product._id}>
      <CardMedia
        component="img"
        height="auto"
        image={product?.image}
        alt={product?.category}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product?.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {"$"}{product?.cost}
        </Typography>
        <Rating name="read-only" value={product?.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button fullWidth className="button" variant="contained" onClick={handleAddToCart}>
          <AddShoppingCartOutlined/>  
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
    </Grid>
  );
};

export default ProductCard;
