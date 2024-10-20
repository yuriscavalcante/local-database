import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import * as dateFns from 'date-fns'

type Props = {
    archives: any[]
    openDialog: (id: number) => void
}

const ArchiveTable = (props: Props) => {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', minWidth: 800 },
        { field: 'createdAt', headerName: 'Inserido em', width: 150 }
    ];

    return (
        <Grid container>
            <Grid size={12} height={800}>
                <DataGrid
                    rows={props.archives} columns={
                        [
                            {
                                field: 'name',
                                headerName: 'Nome',
                                width: 500,
                                flex: 1,
                                renderCell: ({ row }: { row: any }) => {
                                    return (
                                        <Box sx={{ height: 50, display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 5 }} onClick={() => props.openDialog(row.id)}>
                                            <Typography >{row.name}</Typography>
                                        </Box>
                                    )
                                }
                            },
                            {
                                field: 'createdAt',
                                headerName: 'Adicionado em',
                                width: 500,
                                flex: 1,
                                renderCell: ({ row }: { row: any }) => {
                                    return (
                                        <Box sx={{ height: 50, display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 5 }}>
                                            <Typography>{dateFns.format(new Date(row.createdAt), 'dd/MM/yyyy hh:mm')}</Typography>
                                        </Box>
                                    )
                                }
                            }
                        ]
                    }
                    rowSelection={false}
                />
            </Grid>
        </Grid>
    )
}

export default ArchiveTable