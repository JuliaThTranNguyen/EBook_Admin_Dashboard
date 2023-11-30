import { Box, Typography, Button, Input } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import styled from "@emotion/styled";
import { Form } from "react-router-dom";

const CustomBox = styled(Box)({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.724)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CustomModel = styled(Box)({
  padding: 50,
  borderRadius: 10,
  backgroundColor: "#2a3447",
  position: "relative",
});

const CustomCloseButton = styled(Button)({
  top: -30,
  left: 470,
  color: "white",
  fontSize: 15,
});

const CustomForm = styled(Form)({
  display: 'flex',
  flexWrap: 'wrap',
  maxWidth: 500,
  justifyContent: 'space-between',
  paddingTop: 15,
  gap: 10,
});

const CustomFormItem = styled(Box)({
  width: '40%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  marginBottom: 20,
});

const CustomLabel = styled(Typography)({
  fontSize: 14,
});

const CustomInput = styled(Input)({
  padding: 10,
  backgroundColor: 'transparent',
  color: 'white',
  outline: 'none',
  border: '1px solid #ddd',
  BorderAllRounded: 3,
});

const CustomSubmitButton = styled(Button)({
  width: '100%',
  padding: 10,
  cursor: 'pointer',
  border: '1px solid #384256'
});

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddData = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    // mutation.mutate();
    props.setOpen(false);
  };

  return (
    <CustomBox>
      <CustomModel>
        <CustomCloseButton onClick={() => props.setOpen(false)}>X</CustomCloseButton>
        <Typography variant="h4" color="white">
          Add new {props.slug}
        </Typography>
        <CustomForm onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "image")
            .map((column) => (
              <CustomFormItem>
                <CustomLabel>{column.headerName}</CustomLabel>
                <CustomInput type={column.type} placeholder={column.field} />
              </CustomFormItem>
            ))}
          <CustomSubmitButton>Submit</CustomSubmitButton>
        </CustomForm>
      </CustomModel>
    </CustomBox>
  );
};
