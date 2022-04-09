import React, { ReactNode } from "react";
import "./FormButton.scss";
type Props = {
  children: ReactNode;
  isGoogleSignIn: boolean;
  inverted: boolean;
  otherprops: any[];
  type: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.SyntheticEvent) => void;
};

function FormButton({
  children,
  isGoogleSignIn,
  inverted,
  ...otherprops
}: Props) {
  return (
    <button
      className={`${inverted ? "inverted " : ""}custom-botton`}
      {...otherprops}
    >
      {children}
    </button>
  );
}

export default FormButton;
