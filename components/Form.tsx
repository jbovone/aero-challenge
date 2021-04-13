import React, { Dispatch, InputHTMLAttributes } from "react";
import * as yup from "yup";
import { Input } from "./FancyInputs";
import { Formik, useField } from "formik";
import Typography from "./Typography";
import { css } from "@emotion/css";
import { flex } from "../utils/flex";
import MainButton from "./MainButton";
import { IoMdCloseCircle } from "react-icons/io";
import router from "next/router";
import { colors } from "../constants/colors";
import PuffLoader from "react-spinners/PuffLoader";

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
      fill: "white",
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

const loaderStyle = css({
  "&>span": {
    transform: "translateX(10px)",
  },
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
  onSubmit: (data: any) => Promise<void>;
}> = ({ children, Schema, initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={Schema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit, isSubmitting }) => (
      <form className={style}>
        {children}

        <MainButton
          disabled={isSubmitting}
          title="Submit"
          type="submit"
          onClick={(e: any) => handleSubmit(e)}
          className={loaderStyle}
        >
          {isSubmitting && <PuffLoader size="25px" color="white" />}
        </MainButton>
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

interface formProps {
  appDispatch: Dispatch<action>;
}

export const SignUp: React.FC<formProps> = ({ appDispatch }) => {
  const Schema = yup.object().shape({
    username: yup.string().max(30).min(5),
    password: yup.string().max(30).min(8),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  return (
    <FormikWrapper
      Schema={Schema}
      initialValues={{ username: "", password: "", repeatPassword: "" }}
      onSubmit={() => Promise.resolve()}
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

//async function onSubmit (data: any, appDispatch: Dispatch<action>)  {
/* provided that this not a sample app: a real app endpoints here to: /api/auth with data as body */
/* /me endpoint would still be important for example for setting the app initial state */

//}}

export const SignIn: React.FC<formProps> = ({ appDispatch }) => {
  return (
    <FormikWrapper
      initialValues={{ username: "John Kite", password: "John Kite" }}
      onSubmit={async (data) => {
        const timmer = 4000;
        await fetch("api/me")
          .then((res) => res.json())
          .then((user) => {
            router.push("/");
            appDispatch({ type: "setUser", payload: user });
          });
        return Promise.resolve();
      }}
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
