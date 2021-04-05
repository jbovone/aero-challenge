import styled from "@emotion/styled";
import React from "react";
import { colors } from "../constants/colors";
import Typography from "./Typography";
import Link from "next/link";

interface AeroNavLinkProps {
  href: string;
  title: string;
}

const Decorator = styled.div({
  height: "3px",
  width: "0%",
  position: "absolute",
  transition: "500ms",
  background: colors.decorator,
});

const AeroLink = styled.a({
  cursor: "pointer",
  position: "relative",
  "&:hover": {
    div: {
      transition: "500ms",
      width: "100%",
    },
  },
});

const AeroNavLink: React.FC<AeroNavLinkProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <AeroLink>
        <Typography>{title}</Typography>
        <Decorator />
      </AeroLink>
    </Link>
  );
};
export default AeroNavLink;
