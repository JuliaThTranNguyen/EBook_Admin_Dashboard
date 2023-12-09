import { GridColDef } from "@mui/x-data-grid";
import PersonOffIcon from "@mui/icons-material/PersonOff";

export const UserColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "AVATAR",
    width: 100,
    renderCell: (params) => {
      return (
        <img src={params.row.image || <PersonOffIcon />} alt="user avatar" />
      );
    },
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
    type: "string",
  },
  {
    field: "role",
    headerName: "Role",
    width: 110,
    editable: true,
    type: "string",
  },
];

export const CreateUserColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
    type: "string",
  },
  {
    field: "password",
    headerName: "Password",
    width: 110,
    editable: true,
    type: "string",
  },
  {
    field: "image",
    headerName: "Avatar Link",
    width: 110,
    editable: true,
    type: "string",
  },
];

export const EditUserColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
    type: "string",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
    type: "string",
  },
  {
    field: "password",
    headerName: "Password",
    width: 110,
    editable: true,
    type: "string",
  },
  {
    field: "image",
    headerName: "Avatar Link",
    width: 110,
    editable: true,
    type: "string",
  },
];

export const EditRoleColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "role",
    headerName: "Role",
    width: 110,
    editable: true,
    type: "string",
  },
];