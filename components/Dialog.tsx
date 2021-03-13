import React, { useEffect, useRef, useState } from "react";
import { css, CSSInterpolation, keyframes, cx } from "@emotion/css";
import { boxShadow } from "../constants/boxShadow";
import Typography from "./Typography";
import { flex } from "../utils/flex";
import { colors } from "../constants/colors";

interface DialogProps {
  title: string | null;
  dialogId: dialogDispatchEnum | null;
}

interface dialogTypeProps {
  timeToLive: number;
  title: string | null;
}

const ProductBagSuccess: React.FC<DialogProps> = ({ title }) => {
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="p" color={colors.decorators[0]} bold>
        Added to Your Bag!
      </Typography>
    </>
  );
};

const WellcomeSuccess: React.FC<DialogProps> = ({ title }) => {
  return <Typography variant="h2">Wellcome {title}</Typography>;
};

const dialogs: any = {
  ADD_TO_BAG: ProductBagSuccess,
  WELLCOME_SUCCESS: WellcomeSuccess,
} as const;

const Dialog: React.FC<DialogProps> = ({ dialogId, title }) => {
  const [open, setOpen] = useState(false);

  const Component = dialogId ? dialogs[dialogId]! : null;
  const ref = useRef("");

  const style: CSSInterpolation = css({
    ...flex("space-between", "center", "column"),
    boxShadow: boxShadow,
    borderRadius: 10,
    position: "fixed",
    background: colors.fontInverse,
    padding: "3em 2.3em",
    top: "20%",
    zIndex: 10000,
    transition: ".5s ease-in-out",
    border: `solid 1px ${colors.primary}`,
    "&>progress": {
      position: "absolute",
      width: "100%",
      height: 26,
      top: -7,

      color: colors.decorators,
    },
  });

  useEffect(() => {
    if (!dialogId) return;

    const timeout = setTimeout(() => {
      setOpen(() => false);
    }, 4000);

    if (open === false) {
      setOpen(() => true);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [dialogId, title]);

  return (
    <div className={style}>
      <progress value={7} max={10}></progress>
      {Component ? title ? <Component title={title} /> : <Component /> : null}
    </div>
  );
};
export default Dialog;
