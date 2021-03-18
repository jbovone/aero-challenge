import React, { useEffect, useState } from "react";
import { css, cx, CSSInterpolation, CSSObject } from "@emotion/css";
import { boxShadow } from "../constants/boxShadow";
import Typography from "./Typography";
import { flex } from "../utils/flex";
import { colors } from "../constants/colors";
import Progress from "./Progress";

const TIMMER = 1300;

interface dialogTypeProps {
  title: string;
}

const ProductBagSuccess: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="p">{title}</Typography>
      <Typography variant="small" color={colors.decorators[0]} bold>
        Added to Your Bag!
      </Typography>
    </>
  );
};

const EmptyBag: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="p" color={colors.decorators[0]} bold>
        Empty Bag!
      </Typography>
      <Typography variant="small" color={colors.decorators[0]} bold>
        We will redirect you Prizes!
      </Typography>
    </>
  );
};

const WelcomeSuccess: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="h2">Welcome {title}</Typography>
    </>
  );
};

const dialogs: Readonly<Record<
  dialogDispatchEnum,
  React.FC<dialogTypeProps>
>> = {
  ADD_TO_BAG: ProductBagSuccess,
  EMPTY_BAG: EmptyBag,
  WELCOME_SUCCESS: WelcomeSuccess,
  PURCHASE_SUCCESS: WelcomeSuccess,
};

const Dialog: React.FC<DialogProps> = ({ dialogType, title, id, cb }) => {
  const [open, setOpen] = useState(false);
  const Component = dialogs[dialogType];

  const style: CSSInterpolation = css({
    ...flex("space-between", "center", "column"),
    boxShadow: boxShadow,
    position: "fixed",
    background: colors.fontInverse,
    padding: "2.5em 1.5em",
    top: "15%",
    margin: 20,
    right: 0,
    zIndex: open ? 10000 : -100,
    transition: ".3s ease-in-out",
  });
  const closeStyle: CSSInterpolation = css({
    opacity: 0,
    transform: "translate(100%)",
  });

  useEffect(() => {
    setOpen(() => true);
  }, [id]);

  return (
    <div
      className={cx(style, {
        [closeStyle]: !open,
      })}
    >
      <Component title={title || ""}>
        <Progress
          key={id}
          timmer={TIMMER}
          cb={() => {
            console.log("cb", cb);
            if (cb) cb();
            setOpen(() => false);
          }}
        />
      </Component>
    </div>
  );
};
export default Dialog;
