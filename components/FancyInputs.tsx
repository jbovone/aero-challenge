import { css, SerializedStyles, CSSObject } from "@emotion/react";
import React, { Dispatch, InputHTMLAttributes, SetStateAction } from "react";
import { colors } from "../constants/colors";
import Typography from "./Typography";

const fancy: SerializedStyles = css({
  padding: 13,
  margin: 10,
  borderRadius: 5,
  border: `1px solid ${colors.fontSecondary}`,
  ":focus": {
    outline: `none`,
    border: `1px solid ${colors.primary}`,
  },
});

interface InputProps {
  label?: string;
  cssProps?: CSSObject;
}
export const Input: React.FC<
  InputProps & InputHTMLAttributes<HTMLInputElement>
> = ({ onChange, value, cssProps, label, ...props }) => {
  const extraStyle: SerializedStyles = css({
    ...cssProps,
  });
  return (
    <>
      {Boolean(label) && (
        <label htmlFor={props.id}>
          <Typography bold>{label}</Typography>
        </label>
      )}
      <input
        {...props}
        onChange={onChange}
        value={value}
        css={[fancy, extraStyle]}
      />
    </>
  );
};

interface SelectProps {
  setValue: Dispatch<SetStateAction<number>>;
  value: string;
  values: number[];
}

export const Select: React.FC<SelectProps> = ({ setValue, values, value }) => {
  const selectStyle: SerializedStyles = css({
    maxWidth: 60,
  });

  return (
    <select
      css={[fancy, selectStyle]}
      onChange={(e) => setValue(Number(e.target.value))}
      value={value}
    >
      {values.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};
