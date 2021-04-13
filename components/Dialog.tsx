import React, { useEffect, useState } from "react";
import { css, cx, CSSInterpolation } from "@emotion/css";
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
      <Typography variant="small" color="decorator" bold>
        Added to Your Bag!
      </Typography>
    </>
  );
};

const PurchaceSuccess: React.FC<dialogTypeProps> = ({ children }) => {
  return (
    <>
      {children}
      <Typography variant="h4">Congratulations for your Purchase!</Typography>
      <Typography variant="small" color="decorator" bold>
        We will redirect you to reedem.
      </Typography>
    </>
  );
};

const EmptyBag: React.FC<dialogTypeProps> = ({ children }) => {
  return (
    <>
      {children}
      <Typography variant="p" bold>
        Empty Bag!
      </Typography>
      <Typography variant="small" color="decorator" bold>
        We will redirect you Prizes!
      </Typography>
    </>
  );
};

const WelcomeSuccess: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="h4">Welcome {title}</Typography>
    </>
  );
};

const LogOut: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="h4">{title} Has logued out.</Typography>
    </>
  );
};
const CoinsAdded: React.FC<dialogTypeProps> = ({ title, children }) => {
  return (
    <>
      {children}
      <Typography variant="h4">{title} Coins Added Successfully!</Typography>
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
  PURCHASE_SUCCESS: PurchaceSuccess,
  LOG_OUT: LogOut,
  COINS_ADDED: CoinsAdded,
};

const Dialog: React.FC<DialogProps> = ({
  dialogType,
  title,
  id,
  cb,
  timmer,
}) => {
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
          timmer={timmer ? timmer : TIMMER}
          cb={() => {
            if (cb) cb();
            setOpen(() => false);
          }}
        />
      </Component>
    </div>
  );
};
export default Dialog;
