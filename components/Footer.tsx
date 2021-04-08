import React from "react";
import { css } from "@emotion/css";
import { flex } from "../utils/flex";
import Typography from "./Typography";
import { FaGithub, FaLinkedin, FaMailBulk } from "react-icons/fa";
import AeroLogo from "../components/svg/Aerolab";
import { colors } from "../constants/colors";

const style = css({
  ...flex("center", "center", "column"),
  background: "#343a40",
  padding: 30,
  section: {
    ...flex("space-between", "flex-start"),
    width: "60%",
    minWidth: 640,
    maxWidth: 1200,
    marginBottom: 60,
    ul: {
      listStyle: "none",
      ...flex("flex-start", "flex-start", "column"),
      "li:first-child": {
        marginBottom: "1.7em",
      },
      li: {
        margin: "0.5em",
        a: {
          ...flex("center", "center"),
          transition: "all 0.2s",
        },
        svg: {
          verticalAlign: "middle",
          transition: "all 0.2s",
          margin: "0.2em",
          fill: "white",
          height: 20,
          width: 20,
        },
        "&:hover": {
          p: {
            transition: "all 0.2s",
            color: colors.primary,
          },
          svg: {
            transition: "all 0.2s",
            fill: colors.primary,
          },
        },
      },
    },
    "ul:last-child li:hover": {
      p: {
        transition: "all 0.2s",
        color: colors.decorator,
      },
    },
  },
  "@media (max-width: 880px)": {
    section: {
      minWidth: 440,
    },
  },
  "@media (max-width: 520px)": {
    width: "100%",
    section: {
      width: "100%",
      minWidth: "unset",
      ...flex("space-between", "flex-start", "column"),
      ul: {
        marginBottom: 30,
      },
    },
  },
});

const Footer: React.FC<{}> = () => {
  return (
    <footer className={style}>
      <section>
        <ul>
          <li>
            <Typography color="fontInverse" variant="h3">
              About de Developer
            </Typography>
          </li>
          <li>
            <a href="https://linkedin.com/in/jbovone">
              <FaLinkedin />
              <Typography color="fontInverse" variant="p">
                Linkedin
              </Typography>
            </a>
          </li>
          <li>
            <a href="https://github.com/jbovone">
              <FaGithub />
              <Typography color="fontInverse" variant="p">
                Github
              </Typography>
            </a>
          </li>

          <li>
            <a href="mailto:bovonejulian@gmail.com">
              <FaMailBulk />
              <Typography color="fontInverse" variant="p">
                Mail
              </Typography>
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <Typography color="fontInverse" variant="h3">
              <AeroLogo /> AeroLab
            </Typography>
          </li>
          <li>
            <Typography color="fontInverse" variant="p">
              <a href="https://aerolab.co/">Institutional Website</a>
            </Typography>
          </li>
          <li>
            <Typography color="fontInverse" variant="p">
              <a href="https://aerolab.co/coding-challenge-instructions">
                The Challenge
              </a>
            </Typography>
          </li>
          <li>
            <Typography color="fontInverse" variant="p">
              <a href="https://aerolabchallenge.docs.apiary.io/">Api</a>
            </Typography>
          </li>
        </ul>
      </section>
      <Typography color="fontInverse" variant="small">
        By Julián Bovone 2021
      </Typography>
    </footer>
  );
};

export default Footer;
