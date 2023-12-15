import { Link } from "react-router-dom";
import { useState } from "react";

import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import styled from "@emotion/styled";

import "./dataTable.scss";
import { DeleteOtherDialog } from "../deleteData/DeleteOtherData";
import useAppSelector from "../../../hooks/useAppSelector";
import { currentAccessToken } from "../../../redux/reducers/authReducer";


const CustomBoxAction = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 0,
});

const CustomButton = styled(Button)({
  paddingBottom: 17,
  paddingLeft: 2,
  color: "red",
});

const CustomLink = styled(Link)({
  color: "green",
});

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

export const DataTable = (props: Props) => {
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (_id: string) => {
    try {
      if (!accessToken) {
        console.error("Access token not available.");
        return;
      }
      setSelectedId(_id);
      setDeleteDialogOpen(true);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDeleteDialogClose = async () => {
    setDeleteDialogOpen(false);
    setSelectedId(null);
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    renderCell: (params) => {
      return (
        <CustomBoxAction>
          <CustomLink to={`/${props.slug}/${params.row._id}`}>
            <RateReviewIcon />
          </CustomLink>
          <CustomButton onClick={() => handleDelete(params.row._id)}>
            <HighlightOffIcon />
          </CustomButton>
        </CustomBoxAction>
      );
    },
  };

  return (
    <Box className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <DeleteOtherDialog
        isOpen={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        id={selectedId || ""}
        slug={props.slug}
        accessToken={accessToken}
      />
    </Box>
  );
};
