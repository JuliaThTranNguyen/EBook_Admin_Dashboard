import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import "./dataTable.scss"
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import RateReviewIcon from '@mui/icons-material/RateReview';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styled from '@emotion/styled';

const CustomBoxAction = styled(Box)({
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  gap: 0,
})

const CustomButton = styled(Button)({
paddingBottom: 15,
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

export const DataTable =  (props: Props) => {
const handleDelete = (id: number) => {
  //delete user by id
  // axios.delete(`/api/v1/users/:userId`) or axios.delete(`/api/v1/users/${slug}/id`)
  console.log(id + 'has been deleted');
}

const actionColumn: GridColDef = {
  field: 'action',
  headerName: 'Action',
  renderCell: (params) => {
    return (
      <CustomBoxAction>
          <CustomLink to={`/${props.slug}/${params.row.id}`}><RateReviewIcon /></CustomLink>
          <CustomButton onClick={() =>handleDelete(params.row.id)}>
            <HighlightOffIcon />
            </CustomButton>
      </CustomBoxAction>
    )
  }
}

  return (
    <Box className="dataTable">
    <DataGrid
      className="dataGrid"
      rows={props.rows}
      columns={[...props.columns, actionColumn]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
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
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
  )
}
