import { css, CSSInterpolation, cx } from "@emotion/css";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { colors } from "../constants/colors";

interface InputProps {
  onChange: (e: string) => void;
  initialState: string;
  imperativeSetValue?: string;
}
interface SelectProps {
  setValue: Dispatch<SetStateAction<number>>;
  value: string;
  values: number[];
}

const fancy: CSSInterpolation = css({
  padding: 10,
  maxWidth: 57,
  borderRadius: 5,
  border: `1px solid ${colors.fontSecondary}`,
  ":focus": {
    outline: `none`,
    border: `1px solid ${colors.primary}`,
  },
});

const selectStyle: CSSInterpolation = css({
  maxWidth: 60,
});
const inputStyle: CSSInterpolation = css({
  maxWidth: 45,
  textAlign: "center",
});

export const Input: React.FC<InputProps> = ({
  onChange,
  initialState,
  imperativeSetValue,
}) => {
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    if (imperativeSetValue && imperativeSetValue !== value) {
      setValue(imperativeSetValue);
    }
  }, [imperativeSetValue]);
  return (
    <input
      onChange={(e) => {
        onChange(e.target.value);
        setValue(() => e.target.value);
      }}
      value={value}
      className={cx(fancy, inputStyle)}
      type="text"
    />
  );
};

export const Select: React.FC<SelectProps> = ({ setValue, values, value }) => {
  return (
    <select
      className={cx(fancy, selectStyle)}
      onChange={(e) => setValue(Number(e.target.value))}
      value={value}
    >
      {values.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};
