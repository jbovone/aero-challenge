import React, { InputHTMLAttributes, useState } from "react";
import * as yup from "yup";
import { Input } from "./FancyInputs";
import { Formik, ErrorMessage, useField } from "formik";
import Typography from "./Typography";
import { css, CSSObject } from "@emotion/css";
import { flex } from "../utils/flex";
import MainButton from "./MainButton";
import { IoMdCloseCircle } from "react-icons/io";
import router from "next/router";
import { colors } from "../constants/colors";

const style = css({
  ...flex("center", "center", "column"),
  position: "fixed",
  header: {
    ...flex("flex-end", "center"),
    position: "absolute",
    top: 0,
    height: "var(--header-height)",
    width: "100%",
    background: colors.fontPrimary,
    svg: {
      width: 35,
      height: 35,
    },
  },
  right: 0,
  top: 0,
  width: "80%",
  margin: "auto",
  padding: 20,
  minWidth: 310,
  maxWidth: 510,
  height: "calc(100vh + var(--header-height))",
  background: "rgb(255,255,255,0.9)",
  borderLeft: "solid 1px lightgray",
  label: {
    alignSelf: "flex-start",
  },
});

const inputCSS = (error: boolean) => ({
  width: "90%",
  marginBottom: 30,
  border: error ? "solid 1px red" : "solid 1px lightgray",
});

const FormHeader: React.FC = () => (
  <header>
    <MainButton onClick={() => router.push("/")}>
      <IoMdCloseCircle />
    </MainButton>
  </header>
);

const FormikWrapper: React.FC<{
  Schema?: object;
  initialValues: object;
  onSubmit: (data: any) => void;
}> = ({ children, Schema, initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={Schema}
    onSubmit={(data: any) => {
      onSubmit(data);
    }}
  >
    {({ handleSubmit, isSubmitting }) => (
      <form className={style}>
        {children}

        <MainButton title="Submit" onClick={(e: any) => handleSubmit(e)} />
      </form>
    )}
  </Formik>
);

const Field: React.FC<
  InputHTMLAttributes<HTMLInputElement> & { name: string; label: string }
> = (props) => {
  const [{ name, onChange, value, onBlur }, { error, touched }] = useField(
    props
  );
  return (
    <>
      <Input
        name={name}
        label={props.label}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={name}
        type={props.type}
        cssProps={inputCSS(Boolean(error))}
      />
      <Typography color="red" variant="small">
        {Boolean(error) && touched && error}
      </Typography>
    </>
  );
};

const SignUp: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  const Schema = yup.object().shape({
    email: yup.string().max(30).min(5),
    password: yup.string().max(30).min(8),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  return (
    <FormikWrapper
      Schema={Schema}
      initialValues={{ username: "", password: "", repeatPassword: "" }}
      onSubmit={onSubmit}
    >
      <FormHeader />
      <Typography variant="h2" bold>
        Sign Up for Free
      </Typography>
      <Typography variant="p">Win amazing prizes!</Typography>
      <Field name="username" label="Enter your Username" />
      <Field type="password" name="password" label="Enter a Password" />
      <Field type="password" name="repeatPassword" label="Repeat Password" />
    </FormikWrapper>
  );
};

const SignIn: React.FC<{ onSubmit: (data: any) => void }> = ({ onSubmit }) => {
  return (
    <FormikWrapper
      initialValues={{ username: "John Kite", password: "John Kite" }}
      onSubmit={onSubmit}
    >
      <FormHeader />
      <Typography variant="h2" bold>
        Sign In To Claim Your Prize!
      </Typography>
      <Typography variant="p">Win amazing prizes!</Typography>
      <Field name="username" label="Enter your username" />
      <Field type="password" name="password" label="Enter a Password" />
    </FormikWrapper>
  );
};

const Form: React.FC<formHandlerProps> = ({ appDispatch, form }) => {
  const Forms = {
    "sign-up": {
      component: SignUp,
      onSubmit: (data: any) => {
        appDispatch({ type: "setUser", payload: data });
      },
    },
    "sign-in": {
      onSubmit: (data: any) => {
        appDispatch({
          type: "setUser",
          payload: {
            name: "Jhon Kite",
            points: 2400,
            redeemHistory: [],
          },
        });
      },
      component: SignIn,
    },
  };

  const Component = Forms[form]?.component;
  return Component ? <Component onSubmit={Forms[form]?.onSubmit} /> : <></>;
};
export default Form;
