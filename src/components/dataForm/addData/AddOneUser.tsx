import React, { useState } from "react";
import { Form } from "react-router-dom";

import { Box, Typography, Button, Input } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import styled from "@emotion/styled";

import useAppDispatch from "../../../hooks/useAppDispatch";
import { addUser } from "../../../functions/forUser";
import { getAllUsers } from "../../../redux/reducers/authReducer";

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
  display: "flex",
  flexWrap: "wrap",
  maxWidth: 500,
  justifyContent: "space-between",
  paddingTop: 15,
  gap: 10,
});

const CustomFormItem = styled(Box)({
  width: "40%",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 20,
});

const CustomLabel = styled(Typography)({
  fontSize: 14,
});

const CustomInput = styled(Input)({
  padding: 10,
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  border: "1px solid #ddd",
  BorderAllRounded: 3,
});

const CustomSubmitButton = styled(Button)({
  width: "100%",
  padding: 10,
  cursor: "pointer",
  border: "1px solid #384256",
});

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  accessToken: string | null;
};

export const AddOneUser = (props: Props) => {
  const [createdData, setCreatedData] = useState<Record<string, any>>({});

  const dispatch = useAppDispatch();

  /*CREATE A NEW USER*/
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addUser(createdData, props.accessToken);
      dispatch(getAllUsers());

      props.setOpen(false);
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error creating user:", error);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setCreatedData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  return (
    <CustomBox>
      <CustomModel>
        <CustomCloseButton onClick={() => props.setOpen(false)}>
          X
        </CustomCloseButton>
        <Typography variant="h4" color="white">
          Add new {props.slug}
        </Typography>
        <CustomForm onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <CustomFormItem key={column.field}>
                <CustomLabel>{column.headerName}</CustomLabel>

                <CustomInput
                  type={column.type}
                  placeholder={column.field}
                  value={createdData[column.field] || ""}
                  onChange={(e) =>
                    handleInputChange(column.field, e.target.value)
                  }
                />
              </CustomFormItem>
            ))}

          <CustomSubmitButton type="submit" variant="outlined" color="primary">
            Submit
          </CustomSubmitButton>
        </CustomForm>
      </CustomModel>
    </CustomBox>
  );
};
