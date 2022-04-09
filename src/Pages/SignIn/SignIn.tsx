import React, { FC, useState } from "react";
import Form from "./../../Components/FormInput/FormInput";
import Button from "./../../Components/FormButton/FormButton";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../Components/Firebase/firebase";
import { useAppDispatch } from "../../Redux/app/hooks";
import "./SignIn.scss";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password);
    history("/");
    setEmail("");
    setPassword("");
  };
  const handleEmail = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setEmail(target.value);
  };
  const handlePassword = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setPassword(target.value);
  };
  const handleRegister = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    history("/registration");
  };
  return (
    <div className="signin">
      <h2>I already have an account </h2>
      <span>SignIn with email and password</span>
      <form onSubmit={handleSubmit}>
        <Form
          name="email"
          type="email"
          label="Email"
          value={email}
          handleChange={handleEmail}
          required={true}
          otherProps={[]}
        />

        <Form
          name="password"
          type="password"
          label="Password"
          value={password}
          handleChange={handlePassword}
          required={true}
          otherProps={[]}
        />
        <div className="buttons">
          <Button
            isGoogleSignIn={false}
            inverted={false}
            otherprops={[]}
            type={"submit"}
          >
            Sign In
          </Button>
          <Button
            onClick={signInWithGoogle}
            isGoogleSignIn={true}
            inverted={false}
            otherprops={[]}
            type={"submit"}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
      <div className="registration-button">
        <h2>You Don't have an account </h2>
        <div className="button-path">
          <Button
            onClick={handleRegister}
            isGoogleSignIn={false}
            inverted={false}
            otherprops={[]}
            type={"submit"}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
