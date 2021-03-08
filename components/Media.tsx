import React from "react";
import { FaTrash } from "react-icons/fa";
import Button from "./normalizers/Button";
import { css } from "@emotion/css";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import { colors } from "../constants/colors";
import Separator from "./Separator";
import { media } from "../utils/media";

const style = css({
  ...flex("space-between", "stretch"),
  minHeight: 100,
  img: {
    borderRadius: 6,
    border: `1px solid ${colors.boxShadow}`,
    height: "22%",
    width: "22%",
  },
  "&>div": {
    flexWrap: "wrap",
    padding: "2em",
    ...flex("flex-start", "flex-start", "column"),
    p: {
      margin: ".2em 0",
    },
    flex: 1,
    ...media(470, {
      padding: "0.5em",
    }),
  },
  button: {
    background: colors.primary,
    borderRadius: 5,
    padding: "1em",
    maxHeight: 90,
    svg: {
      height: 20,
      width: 20,
      fill: "whitesmoke",
    },
    ...media(470, {
      svg: {
        height: 13,
        width: 13,
      },
    }),
  },
});

const Media: React.FC<cardProps> = ({ product, setToCart }) => {
  return (
    <>
      <article className={style}>
        <img src={product.img.url} alt="Price" />
        <div>
          <Typography>Name: {product.name}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Cost: {product.cost}</Typography>
        </div>
        <Button
          onClick={() =>
            setToCart((items) => items.filter((item) => item.id !== product.id))
          }
        >
          <FaTrash />
        </Button>
      </article>
      <Separator />
    </>
  );
};
export default Media;
