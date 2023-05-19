import React, { useState } from "react";
import Input from "../../shared/components/FormElements/Input";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import "./Auth.css";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handlerSubmit = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const switchHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };
  console.log(formState.isValid);
  return (
    <Card className="authentication">
      <h2 className="center">Login Form</h2>
      <hr></hr>
      <form className="place-form" onSubmit={handlerSubmit}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter valid password, at least 8 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
        <Button inverse onClick={switchHandler}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
