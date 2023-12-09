import { Link } from 'react-router-dom';
  
import {
  Button,
  Box,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styled from '@emotion/styled';

import "./dataTable.scss"
import { useState } from 'react';
import useAppSelector from '../../../hooks/useAppSelector';
import { currentAccessToken } from '../../../redux/reducers/authReducer';
import { DeleteBookDialog } from '../deleteData/DeleteBookDialog';
import { Book } from '../../../types/Book';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { currentBooktotalPages, getAllBooks, setAllBooks } from '../../../redux/reducers/booksReducer';

const CustomBoxAction = styled(Box)({
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  gap: 0,
})

const CustomButton = styled(Button)({
paddingBottom: 17,
paddingLeft: 2,
color: 'red'
})

const CustomLink = styled(Link)({
  color: 'green'
  })



type Props = {
    columns: GridColDef[];
    rows: object[];
    slug: string;
  };

  
export const BookTable =  (props: Props) => {
  const accessToken: string | null = useAppSelector(currentAccessToken);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedIsbn, setSelectedIsbn] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const totalBookPages: number = useAppSelector(currentBooktotalPages) ?? 3;

  const handleDeleteClick = (isbn: string) => {
    setDeleteDialogOpen(true);
    setSelectedIsbn(isbn);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedIsbn(null);
  };

  const refreshBookData = async () => {
    try {
      // Fetch all data again from books
      const fetchBookData = async () => {
        let currentPage = 1;
        let allBooks: Book[] = [];

        while (currentPage <= totalBookPages) {
          const result = await dispatch(getAllBooks(currentPage));

          if (getAllBooks.fulfilled.match(result)) {
            const { books } = result.payload;
            allBooks = [...allBooks, ...books];
            currentPage += 1;
          } else {
            break;
          }
        }

        dispatch(setAllBooks(allBooks));
      };

      fetchBookData();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

const actionColumn: GridColDef = {
  field: 'action',
  headerName: 'Action',
  renderCell: (params) => {
    return (
      <CustomBoxAction>
         <CustomLink to={`/${props.slug}/${params.row.isbn}`}>
            <RateReviewIcon />
          </CustomLink>
        <CustomButton onClick={() => handleDeleteClick(params.row.isbn)}>
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
     <DeleteBookDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onRefreshData={refreshBookData}
        isbn={selectedIsbn || ''}
        accessToken={accessToken}
      />
  </Box>
  )
}
