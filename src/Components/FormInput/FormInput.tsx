import React from "react";
import "./FormInput.scss";
interface Props {
  label: string;
  handleChange?: (e: React.FormEvent) => void;
  name: string;
  type: string;
  value: string;
  required: boolean;
  otherProps: any[];
  onChange?: (e: React.FormEvent) => void;
}
const Form: React.FC<Props> = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default Form;
