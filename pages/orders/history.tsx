import { Box, Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import React from 'react';
import { ShopLayout } from '../../components/layouts';
import NextLink from 'next/link';
import { ArrowForward } from '@mui/icons-material';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100, sortable: false },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color='success' label='Pagada' variant='outlined' />
      ) : (
        <Chip color='error' label='No pagada' variant='outlined' />
      );
    },
  },
  {
    field: 'link',
    headerName: 'Ver orden',
    width: 80,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      console.log({ params });
      return (
        <Box display='flex' justifyContent='center'>
          <NextLink href={`/orders/${params.row.id}`}>
            <Link
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                justifyContent: 'center',
              }}
              underline='always'
            >
              Ver orden
            </Link>
          </NextLink>
        </Box>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    fullname: 'Nacho Armand',
    paid: true,
  },
  {
    id: 2,
    fullname: 'Nacho Armand',
    paid: true,
  },
  {
    id: 3,
    fullname: 'Nacho Armand',
    paid: false,
  },
  {
    id: 4,
    fullname: 'Nacho Armand',
    paid: true,
  },
  {
    id: 5,
    fullname: 'Nacho Armand',
    paid: false,
  },
  {
    id: 6,
    fullname: 'Nacho Armand',
    paid: true,
  },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial' pageDescription='Historial de ordenes de compra'>
      <Typography variant='h1'>Historial de ordenes</Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
