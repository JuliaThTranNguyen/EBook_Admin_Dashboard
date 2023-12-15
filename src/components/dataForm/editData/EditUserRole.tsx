import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import styled from "@emotion/styled";

import { updateRole } from "../../../functions/forUser";
import { User } from "../../../types/User";

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
  color: "white",
});

const CustomModel = styled(Box)({
  padding: 50,
  borderRadius: 10,
  backgroundColor: "#2a3447",
  position: "relative",
});

const CustomCloseButton = styled(Button)({
  top: -30,
  left: 200,
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

const CustomSelect = styled(Select)({
  padding: 10,
  height: 40, 
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  border: "1px solid #ddd",
  borderRadius: 3,
});

const CustomInput = styled(Input)({
  padding: 10,
  height: 40, 
  backgroundColor: "transparent",
  color: "white",
  outline: "none",
  border: "1px solid #ddd",
  borderRadius: 3,
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
  user: User | null;
  id: string | undefined;
  accessToken: string | null;
  onEditSuccess: () => void;
};

export const EditUserRole = (props: Props) => {
  const [updatedData, setUpdatedData] = useState<Record<string, any>>({});

  useEffect(() => {
    const defaultValues: Record<string, any> = {};
    props.columns.forEach((column) => {
      if (column.field !== "id") {
        defaultValues[column.field] = (props.user as any)?.[column.field] || "";
      }
    });
    setUpdatedData(defaultValues);
  }, [props.columns, props.user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateRole(props.id, updatedData, props.accessToken);

      props.setOpen(false);
      props.onEditSuccess();
    } catch (error) {
      alert("Oops! There might be something wrong. Please refresh and try again.")
      console.error("Error updating role:", error);
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setUpdatedData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  return (
    <CustomBox>
      <CustomModel>
        <CustomCloseButton onClick={() => props.setOpen(false)}>
          X
        </CustomCloseButton>
        <Typography variant="h4" color="white">
          Edit {props.slug} role
        </Typography>
        <CustomForm onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id")
            .map((column) => (
              <CustomFormItem key={column.field}>
                <CustomLabel>{column.headerName}</CustomLabel>
                {column.field === "role" ? (
                  <CustomSelect
                    value={updatedData[column.field] || ""}
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  >
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                    <MenuItem value="USER">USER</MenuItem>
                  </CustomSelect>
                ) : (
                  <CustomInput
                    type={column.type}
                    placeholder={column.field}
                    value={updatedData[column.field] || ""}
                    onChange={(e) =>
                      handleInputChange(column.field, e.target.value)
                    }
                  />
                )}
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
