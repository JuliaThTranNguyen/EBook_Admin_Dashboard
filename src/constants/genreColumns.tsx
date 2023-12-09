import { GridColDef } from "@mui/x-data-grid";

export const GenreColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      editable: true,
      type: 'string',
    },
  ];