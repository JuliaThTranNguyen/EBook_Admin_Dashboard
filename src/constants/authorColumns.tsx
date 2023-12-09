import { GridColDef } from "@mui/x-data-grid";

export const AuthorColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "AVATAR",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            src={params.row.image || "../../assests/noavatar.png"}
            alt="Author Avatar"
          />
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
      type: "string",
    },
    {
      field: "bio",
      headerName: "Bio",
      width: 200,
      editable: true,
      type: "string",
    },
  ];