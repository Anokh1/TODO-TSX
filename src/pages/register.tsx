import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import ButtonLink from "../components/buttonLink";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);




  return (
      <div className="register-form-section">
        <h2>Register</h2>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">Email</label>
        </span>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">First Name</label>
        </span>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">Last Name</label>
        </span>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">Age</label>
        </span>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">Password</label>
        </span>
        <span className="p-float-label input">
          <InputText className="form-input" />
          <label htmlFor="input_value">Confirm Password</label>
        </span>
        <Button type="submit" label="Register" />
        <ButtonLink to="/login">Login</ButtonLink>
      </div>
  );
}
