import { useState } from "react";

export const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};
