import React from "react";
import { styled, TextField } from "@mui/material";
import { useField } from "formik";

const StyledTextField = styled(TextField)({
  "& .MuiFormHelperText-root": {
    marginLeft: "3px",
  },
});

export default function Input(props) {
  const [field, meta] = useField(props.name);

  const configTextField = {
    ...field,
    ...props,
    size: "small",
    fullWidth: true,
    error: meta && meta.touched && meta.error,
    helperText: meta && meta.touched && meta.error ? meta.error : null,
  };

  return <StyledTextField {...configTextField} />;
}
