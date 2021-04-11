import React, { useState } from "react";
import Typography from "./Typography";
import { Input } from "./FancyInputs";
import { css, cx } from "@emotion/css";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import { colors } from "../constants/colors";
import Separator from "../components/Separator";
import { boxShadow } from "../constants/boxShadow";
import { media } from "../utils/media";

interface PromoCardProps {
  points: 1000 | 5000 | 7500;
  background: string;
}

const style = css({
  ...flex("space-between", "center", "column"),
  minWidth: 280,
  maxWidth: 310,
  minHeight: 270,
  padding: 20,
  margin: 20,
  boxShadow: boxShadow,
  section: {
    width: "100%",
    "p:first-child": {
      alignSelf: "flex-start",
      padding: 8,
    },
    ...flex("center", "center"),
  },
  div: {
    ...flex(),
  },
  input: {
    maxWidth: 33,
    margin: 3,
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.fontSecondary,
    border: "2px solid lightgray",
    textAlign: "center",
  },
  footer: {
    ...flex("center", "center", "column"),
    minHeight: 65,
  },
  ...media(380, {
    minWidth: 260,
  }),
});

const PromoCard: React.FC<PromoCardProps> = ({ points, background }) => {
  const backgroundStyle = css({
    background: `url('/images/${background}') no-repeat bottom`,
    backgroundSize: "contain",
  });
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  return (
    <article className={cx(style, backgroundStyle)}>
      <header>
        <Typography variant="h2" color="fontSecondary" bold>
          Claim {points} Coins!
        </Typography>
      </header>
      <section>
        <Typography variant="p" color="fontSecondary" bold>
          Code
        </Typography>
        <div>
          {values.map((value, i) => (
            <Input
              key={i}
              value={value}
              onChange={({ target }) =>
                setValues((values) =>
                  values.map((value, j) =>
                    j === i ? target.value[target.value.length - 1] : value
                  )
                )
              }
            />
          ))}
        </div>
      </section>
      <footer>
        <PillButton title="Claim Points" />
      </footer>
    </article>
  );
};
export default PromoCard;
