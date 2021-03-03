import { css, CSSInterpolation } from "@emotion/css";
import React, { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import Box from "./Box";
import Typography from "./Typography";

interface CardProps {
  img: {
    url: string;
    hdUrld: string;
  };
  id: string;
  name: string;
  cost: number;
  category: string;
}

const style: CSSInterpolation = css({});

const Card: React.FC<CardProps> = ({ id: _id, ...props }) => {
  return (
    <Box tag="article" size={250} shadow={1}>
      <header></header>
      <Image src={props.img.url} layout="fill" />
      <Typography></Typography>
        <hr />
    </Box>
  );
};
export default Card;
