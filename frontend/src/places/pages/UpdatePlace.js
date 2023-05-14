import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creatorId: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creatorId: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { placeId } = useParams();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: false,
        isValid: true,
      },
      description: {
        value: false,
        isValid: true,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find(({ id }) => id === placeId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
