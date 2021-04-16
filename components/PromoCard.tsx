import React, { useState, Dispatch, useEffect } from "react";
import Typography from "./Typography";
import { Input } from "./FancyInputs";
import { css, CSSObject, SerializedStyles, keyframes } from "@emotion/react";
import { flex } from "../utils/flex";
import PillButton from "./PillButton";
import { colors } from "../constants/colors";
import { boxShadow } from "../constants/boxShadow";
import { media } from "../utils/media";
import useFetch from "../hooks/useFetch";
import PacmanLoader from "react-spinners/PacmanLoader";

interface PromoCardProps {
  points: 1000 | 5000 | 7500;
  background: string;
  appDispatch: Dispatch<action>;
  initialValue: string;
}

const style = css({
  ...flex("space-between", "center", "column"),
  position: "relative",
  minWidth: 280,
  maxWidth: 310,
  minHeight: 270,
  padding: 20,
  margin: 20,
  transition: "0.6s",
  boxShadow: boxShadow,
  section: {
    position: "relative",
    minHeight: 50,
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
    minHeight: 65,
  },
  ...media(380, {
    minWidth: 260,
  }),
});

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const sucessStyle = css({
  animation: `${bounce} .8s ease-in-out;`,
});

const loadingStyle: SerializedStyles = css({
  "section div": {
    transform: "translate(-85px, -24px) scale(.7)",
  },
});

const PromoCard: React.FC<PromoCardProps> = ({
  points,
  background,
  appDispatch,
  initialValue,
}) => {
  const backgroundStyle = css({
    background: `url('/images/${background}') no-repeat bottom`,
    backgroundSize: "contain",
  });
  const [values, setValues] = useState<string[]>(initialValue.split(""));
  const [{ error, loading, success }, handleFetch, setState] = useFetch();
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setState((state) => ({ ...state, success: false }));
      }, 4000);
    }
  }, [success]);
  return (
    <article
      css={[
        style,
        backgroundStyle,
        success && sucessStyle,
        loading && loadingStyle,
      ]}
    >
      <header>
        <Typography variant="h2" color="fontSecondary" bold>
          {success ? `Claimed ${points} Coins!` : `Claim ${points} Coins!`}
        </Typography>
      </header>
      <section>
        {loading ? (
          <div>
            <PacmanLoader color={colors.decorator} />
          </div>
        ) : (
          <>
            <Typography variant="p" color="fontSecondary" bold>
              Code
            </Typography>
            <div>
              {values.map((value, i) => (
                <Input
                  key={i}
                  disabled={success || loading}
                  value={value}
                  onChange={({ target }) =>
                    setValues((values) =>
                      values.map((value, j) =>
                        j === i
                          ? target.value[target.value.length - 1] || ""
                          : value
                      )
                    )
                  }
                />
              ))}
            </div>
          </>
        )}

        {error && (
          <Typography
            variant="small"
            color="danger"
            cssProps={{ position: "absolute", bottom: -25 }}
          >
            {typeof error === "string"
              ? `${error}`
              : "Service unavailable at the moment"}
          </Typography>
        )}
      </section>
      <footer>
        <PillButton
          title={success ? "Enjoy!" : "Claim Points"}
          disabled={success || loading}
          onClick={() =>
            values.join("").length === 4
              ? handleFetch(
                  `api/points`,
                  { points, code: values.join("") },
                  () => {
                    setValues(() => ["", "", "", ""]);
                    appDispatch({
                      type: "coinsClaimedSucesss",
                      payload: points,
                    });
                  },
                  2000
                )
              : setState((state) => ({
                  ...state,
                  error: "please insert a valid code",
                }))
          }
        />
      </footer>
    </article>
  );
};
export default PromoCard;
