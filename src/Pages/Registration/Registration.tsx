import { set } from "immer/dist/internal";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserProfileDocument,
} from "../../Components/Firebase/firebase";
import Form from "../../Components/FormInput/FormInput";
import Button from "./../../Components/FormButton/FormButton";
import "./Registration.scss";

const Registration: FC = () => {
  const [displayName, setDisplayName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const history = useNavigate();
  console.log("displayName:", typeof displayName);
  console.log("email:", email);
  console.log("password:", password);
  console.log("password:", confirm);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Password don't match");
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await createUserProfileDocument(user, { displayName, address });
      setDisplayName("");
      setAddress("");
      setEmail("");
      setPassword("");
      setConfirm("");
      alert("Registration Succeded");
      history({ pathname: "/" });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="registration">
      <h2 className="title">Create an Account</h2>
      <span>Sign up with email and password</span>
      <form className="registration-form" onSubmit={handleSubmit}>
        <Form
          type="text"
          name="displayName"
          value={displayName}
          onChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setDisplayName(target.value);
          }}
          label="First Name/Last Name"
          required={true}
          otherProps={[]}
        />
        <Form
          type="address"
          name="address"
          value={address}
          onChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setAddress(target.value);
          }}
          label="Address"
          required
          otherProps={[]}
        />
        <Form
          type="email"
          name="email"
          value={email}
          onChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setEmail(target.value);
          }}
          label="Email"
          required={true}
          otherProps={[]}
        />
        <Form
          type="password"
          name="password"
          value={password}
          onChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setPassword(target.value);
          }}
          label="password"
          required
          otherProps={[]}
        />
        <Form
          type="password"
          name="password"
          value={confirm}
          onChange={(e: React.SyntheticEvent) => {
            let target = e.target as HTMLInputElement;
            setConfirm(target.value);
          }}
          label="Confirm Password"
          required
          otherProps={[]}
        />
        <Button
          type="submit"
          isGoogleSignIn={false}
          inverted={false}
          otherprops={[]}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Registration;
