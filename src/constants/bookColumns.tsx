import { GridColDef } from "@mui/x-data-grid";
import PersonOffIcon from '@mui/icons-material/PersonOff'; 
import { Author } from "../types/Author";
import { Genre } from "../types/Genre";

export const BookColumns: GridColDef[] = [
    { field: 'id', headerName: '', width: 50 },
    { field: 'image', headerName: 'Image', width: 90,
      renderCell:(params) => {
          return <img src={params.row.image || <PersonOffIcon/> } alt="empty" />
      }
  },
    {
      field: 'isbn',
      headerName: 'ISBN',
      width: 100,
      editable: true,
      type: 'string',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 120,
      editable: true,
      type: 'string',
    },
    {
      field: "authors",
      headerName: "Authors",
      width: 90,
      editable: true,
      renderCell: (params) => {
        return (params.row.authors as Author[]).map((author) => author.name).join(", ");
      },
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      width: 110,
      editable: true,
      type: 'string',
    },
    {
      field: "genres",
      headerName: "Genres",
      width: 90,
      editable: true,
      renderCell: (params) => {
        return (params.row.genres as Genre[]).map((genre) => genre.title).join(", ");
      },
    },
    {
      field: 'publishedDate',
      headerName: 'Public Date',
      width: 100,
      editable: true,
      type: 'Date',
      valueGetter: (params) => new Date().toLocaleString(), // Set to the current date and time
    },
  ];
