import { Box } from '@mui/material'
import "./dataTable.scss"
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

type Props = {
    columns: GridColDef[];
    rows: object[];
  };

export const DataTable =  (props: Props) => {
  return (
    <Box className="dataTable" sx={{ height: '70%', width: '75%' }}>
    <DataGrid
      className="dataGrid"
      rows={props.rows}
      columns={props.columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
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
